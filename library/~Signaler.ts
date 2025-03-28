const RUNNING = 1 << 0
const NOTIFIED = 1 << 1
const OUTDATED = 1 << 2
const DISPOSED = 1 << 3
const ERRORING = 1 << 4
const TRACKING = 1 << 5
const THRESHOLD = 1 << 7

let batchDepth: number = 0
let batchIterate: number = 0
let globalVersion: number = 0
let globalEffect: Effect | undefined = undefined
let evalContext: Computed | Effect | undefined = undefined

interface ReadonlySignal<T = any> {
  readonly value: T;
  subscribe(fn: (value: T) => void): () => void;
  toString(): string;
  valueOf(): T;
  toJSON(): T;
  peek(): T;
}

interface NewSignal<T = any> {
  <P = T>(value: P): Signal<P>;
  <P = undefined>(): Signal<P | undefined>;
}

interface EffectFn {
  (): void | (() => void);
}

interface Node {
  signal: Signal;
  target: Computed | Effect;
  rollbackNode?: Node;
  prevSource?: Node;
  nextSource?: Node;
  prevTarget?: Node;
  nextTarget?: Node;
  version: number;
}

class Util {
  static isNeedRecompute(target: Computed | Effect) {
    for (let node = target.source; node !== undefined; node = node.nextSource) {
      if (node.signal.version !== node.version || !node.signal.refresh() || node.signal.version !== node.version) {
        return true
      }
    }
    return false
  }

  static prepareSources(target: Computed | Effect) {
    for (let node = target.source; node !== undefined; node = node.nextSource) {
      if (node.signal.node !== undefined) {
        node.rollbackNode = node.signal.node
      }

      node.version = -1
      node.signal.node = node

      if (node.nextSource === undefined) {
        target.source = node
        break
      }
    }
  }

  static cleanSources(target: Computed | Effect) {
    let node = target.source
    let head = undefined

    while (node !== undefined) {
      const prev = node.prevSource

      if (node.version === -1) {
        node.signal.delNode(node)

        if (prev !== undefined) {
          prev.nextSource = node.nextSource
        }

        if (node.nextSource !== undefined) {
          node.nextSource.prevSource = prev
        }
      } else {
        head = node
      }

      node.signal.node = node.rollbackNode

      if (node.rollbackNode !== undefined) {
        node.rollbackNode = undefined
      }

      node = prev
    }

    target.source = head
  }

  static startBatch() {
    batchDepth++
  }

  static endBatch() {
    if (batchDepth > 1) {
      batchDepth--
      return
    }

    let error: unknown
    let hasError = false

    while (globalEffect !== undefined) {
      let effect: Effect | undefined = globalEffect

      globalEffect = undefined
      batchIterate++

      while (effect !== undefined) {
        const next: Effect | undefined = effect.nextEffect
        effect.nextEffect = undefined
        effect.flags &= ~NOTIFIED

        if (!(effect.flags & DISPOSED) && Util.isNeedRecompute(effect)) {
          try {
            effect.callback()
          } catch (err) {
            if (!hasError) {
              hasError = true
              error = err
            }
          }
        }

        effect = next
      }
    }

    batchIterate = 0
    batchDepth--

    if (hasError) {
      throw error
    }
  }
}

class Effect {
  fn?: EffectFn
  nextEffect?: Effect
  cleanup?: () => void = undefined
  source?: Node = undefined
  flags: number = TRACKING

  constructor(fn: EffectFn) {
    this.fn = fn
  }

  callback() {
    const finish = this.start()

    try {
      if (this.flags & DISPOSED) return
      if (this.fn === undefined) return

      const cleanup = this.fn()

      if (typeof cleanup === 'function') {
        this.cleanup = cleanup
      }
    } finally {
      finish()
    }
  }

  dispose() {
    this.flags |= DISPOSED

    if (!(this.flags & RUNNING)) {
      for (let node = this.source; node !== undefined; node = node.nextSource) {
        node.signal.delNode(node)
      }

      this.source = undefined
      this.fn = undefined
      this.clean()
    }
  }

  notify() {
    if (!(this.flags & NOTIFIED)) {
      this.nextEffect = globalEffect
      this.flags |= NOTIFIED
      globalEffect = this
    }
  }

  clean() {
    const cleanup = this.cleanup

    this.cleanup = undefined

    if (typeof cleanup === 'function') {
      Util.startBatch()

      const ctx = evalContext

      evalContext = undefined

      try {
        cleanup()
      } catch (err) {
        this.flags &= ~RUNNING
        this.flags |= DISPOSED
        this.dispose()
        throw err
      } finally {
        evalContext = ctx
        Util.endBatch()
      }
    }
  }

  start() {
    if (this.flags & RUNNING) {
      throw new Error('Cycle detected')
    }

    this.flags |= RUNNING
    this.flags &= ~DISPOSED

    this.clean()

    Util.prepareSources(this)

    Util.startBatch()

    const ctx = evalContext

    const end = (ctx?: Computed | Effect) => {
      if (evalContext !== this) {
        throw new Error('Out-of-order effect')
      }

      Util.cleanSources(this)

      evalContext = ctx

      this.flags &= ~RUNNING

      if (this.flags & DISPOSED) {
        this.dispose()
      }

      Util.endBatch()
    }

    const finish = end.bind(this, ctx)

    evalContext = this

    return finish
  }
}

class Signal<T = any> {
  val?: T
  err?: unknown
  node?: Node = undefined
  target?: Node = undefined
  version: number = 0

  get value(): T {
    const node = this.dependency()

    if (node !== undefined) {
      node.version = this.version
    }

    return this.val as T
  }

  set value(val: T) {
    if (val === this.val) {
      return
    }

    if (batchIterate > THRESHOLD) {
      throw new Error('Cycle detected')
    }

    globalVersion++

    this.version++

    this.val = val

    try {
      Util.startBatch()

      for (let node = this.target; node !== undefined; node = node.nextTarget) {
        node.target.notify()
      }
    } finally {
      Util.endBatch()
    }
  }

  constructor(val?: T) {
    this.val = val
  }

  addNode(node: Node) {
    if (this.target !== node && node.prevTarget === undefined) {
      node.nextTarget = this.target

      if (this.target !== undefined) {
        this.target.prevTarget = node
      }

      this.target = node
    }
  }

  delNode(node: Node) {
    if (this.target !== undefined) {
      const prev = node.prevTarget
      const next = node.nextTarget

      if (prev !== undefined) {
        prev.nextTarget = next
        node.prevTarget = undefined
      }

      if (next !== undefined) {
        next.prevTarget = prev
        node.nextTarget = undefined
      }

      if (node === this.target) {
        this.target = next
      }
    }
  }

  subscribe(fn: (value: T) => void) {
    return effect(() => {
      const value = this.value
      const ctx = evalContext

      evalContext = undefined

      try { fn(value) } finally {
        evalContext = ctx
      }
    })
  }

  dependency() {
    if (evalContext === undefined) {
      return undefined
    }

    let node: Node | undefined = this.node

    if (node === undefined || node.target !== evalContext) {
      node = {
        version: 0,
        signal: this,
        target: evalContext,
        prevSource: evalContext.source,
        nextSource: undefined,
        prevTarget: undefined,
        nextTarget: undefined,
        rollbackNode: node,
      }

      if (evalContext.source !== undefined) {
        evalContext.source.nextSource = node
      }

      evalContext.source = node

      this.node = node

      if (evalContext.flags & TRACKING) {
        this.addNode(node)
      }

      return node
    }

    if (node.version === -1) {
      node.version = 0

      if (node.nextSource !== undefined) {
        node.nextSource.prevSource = node.prevSource

        if (node.prevSource !== undefined) {
          node.prevSource.nextSource = node.nextSource
        }

        node.prevSource = evalContext.source
        node.nextSource = undefined

        evalContext.source!.nextSource = node
        evalContext.source = node
      }

      return node
    }

    return undefined
  }

  refresh() {
    return true
  }

  toString() {
    return this.value + ''
  }

  valueOf() {
    return this.value
  }

  toJSON() {
    return this.value
  }

  peek() {
    const ctx = evalContext

    evalContext = undefined

    try { return this.value } finally {
      evalContext = ctx
    }
  }
}

class Computed<T = any> extends Signal<T> {
  globalVersion: number = globalVersion - 1
  source?: Node = undefined
  flags: number = OUTDATED
  fn: () => T

  get value(): T {
    if (this.flags & RUNNING) {
      throw new Error('Cycle detected')
    }

    const node = this.dependency()

    this.refresh()

    if (node !== undefined) {
      node.version = this.version
    }

    if (this.flags & ERRORING) {
      throw this.err
    }

    return this.val as T
  }

  constructor(fn: () => T) {
    super(undefined)
    this.fn = fn
  }

  addNode(node: Node) {
    if (this.target === undefined) {
      this.flags |= OUTDATED | TRACKING

      for (let node = this.source; node !== undefined; node = node.nextSource) {
        node.signal.addNode(node)
      }
    }

    super.addNode(node)
  }

  delNode(node: Node) {
    if (this.target !== undefined) {
      super.delNode(node)

      if (this.target === undefined) {
        this.flags &= ~TRACKING

        for (let node = this.source; node !== undefined; node = node.nextSource) {
          node.signal.delNode(node)
        }
      }
    }
  }

  refresh() {
    this.flags &= ~NOTIFIED

    if (this.flags & RUNNING) {
      return false
    }

    if ((this.flags & (OUTDATED | TRACKING)) === TRACKING) {
      return true
    }

    this.flags &= ~OUTDATED

    if (this.globalVersion === globalVersion) {
      return true
    }

    this.globalVersion = globalVersion

    this.flags |= RUNNING

    if (this.version > 0 && !Util.isNeedRecompute(this)) {
      this.flags &= ~RUNNING
      return true
    }

    const selfContext = this
    const prevContext = evalContext

    try {
      Util.prepareSources(this)

      evalContext = selfContext

      const value = this.fn()

      if (this.flags & ERRORING || this.val !== value || this.version === 0) {
        this.version = this.version + 1
        this.flags &= ~ERRORING
        this.err = undefined
        this.val = value
      }
    } catch (err) {
      this.version = this.version + 1
      this.flags |= ERRORING
      this.err = err
    }

    evalContext = prevContext

    Util.cleanSources(this)

    this.flags &= ~RUNNING

    return true
  }

  notify() {
    if (!(this.flags & NOTIFIED)) {
      this.flags |= OUTDATED | NOTIFIED

      for (let node = this.target; node !== undefined; node = node.nextTarget) {
        node.target.notify()
      }
    }
  }
}

const untracked = <T = void>(fn: () => T) => {
  const ctx = evalContext

  evalContext = undefined

  try { return fn() } finally {
    evalContext = ctx
  }
}

const computed = <T = void>(fn: () => T) => {
  return new Computed(fn) as ReadonlySignal<T>
}

const effect = <T = void>(fn: EffectFn) => {
  const effect = new Effect(fn)

  try {
    effect.callback()
  } catch (err) {
    effect.dispose()
    throw err
  }

  return effect.dispose.bind(effect) as () => T
}

const signal: NewSignal = <T>(val?: T) => {
  return new Signal(val)
}

const batch = <T = void>(fn: () => T) => {
  if (batchDepth > 0) {
    return fn()
  }

  Util.startBatch()

  try {
    return fn()
  } finally {
    Util.endBatch()
  }
}

export default {
  untracked,
  computed,
  effect,
  signal,
  batch,
}

export type {
  ReadonlySignal,
  NewSignal,
  EffectFn,
}

export {
  untracked,
  computed,
  effect,
  signal,
  batch,
}
