import { isFinite } from './-Number'
import { toFinite } from './-Number'
import { isObject } from './-Object'
import { isFunction } from './-Function'
import { isNullable } from './~Nullable'

export const debounce = (func: Function, wait: number, options: { leading?: boolean; trailing?: boolean; maxWait?: number; } = {}) => {
  let result: any
  let timerId: any
  let lastArgs: any
  let lastThis: any
  let lastCallTime = 0
  let lastInvokeTime = 0

  if (!isFunction(func)) {
    throw new TypeError('#<func> is not a function')
  }

  if (!isObject(options)) {
    options = {}
  }

  wait = Math.max(toFinite(wait), 0)

  const leading = options.leading === true
  const trailing = options.trailing !== false
  const useFrame = wait < 20 && typeof window.requestAnimationFrame === 'function'
  const maxWait = isFinite(options.maxWait) && Math.max(options.maxWait, wait)

  function timerExpired() {
    const time = Date.now()

    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }

    if (useFrame) timerId = window.requestAnimationFrame(timerExpired)
    if (!useFrame) timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const remainingCallTime = Math.max(wait - timeSinceLastCall, 0)
    const remainingInvokeTime = Math.max(+maxWait! - timeSinceLastInvoke, 0)
    return maxWait === false ? remainingCallTime : Math.min(remainingCallTime, remainingInvokeTime)
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    return (
      lastCallTime === 0 ||
      timeSinceLastCall < 0 ||
      timeSinceLastCall >= wait ||
      (maxWait !== false && timeSinceLastInvoke >= maxWait)
    )
  }

  function leadingEdge(time: number) {
    if (leading) {
      return invokeFunc(time)
    }

    lastInvokeTime = time

    if (useFrame) timerId = window.requestAnimationFrame(timerExpired)
    if (!useFrame) timerId = setTimeout(timerExpired, wait)

    return result
  }

  function trailingEdge(time: number) {
    timerId = undefined

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }

    lastArgs = lastThis = undefined

    return result
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const context = lastThis
    lastInvokeTime = time
    lastArgs = lastThis = undefined
    result = func.apply(context, args)
    return result
  }

  function cancel() {
    if (!isNullable(timerId)) {
      if (useFrame) window.cancelAnimationFrame(timerId)
      if (!useFrame) clearTimeout(timerId)
    }

    lastArgs = lastThis = timerId = undefined
    lastCallTime = lastInvokeTime = 0
  }

  function flush() {
    return isNullable(timerId) ? result : trailingEdge(Date.now())
  }

  function debounced(this: any, ...rest: any[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastThis = this
    lastArgs = rest
    lastCallTime = time

    if (isInvoking && isNullable(timerId)) {
      return leadingEdge(lastCallTime)
    }

    if (isInvoking && maxWait !== false) {
      if (!useFrame) clearTimeout(timerId)
      if (useFrame) window.cancelAnimationFrame(timerId)

      if (useFrame) (timerId = window.requestAnimationFrame(timerExpired))
      if (!useFrame) (timerId = setTimeout(timerExpired, remainingWait(time)))

      return invokeFunc(lastCallTime)
    }

    if (isNullable(timerId)) {
      if (useFrame) timerId = window.requestAnimationFrame(timerExpired)
      if (!useFrame) timerId = setTimeout(timerExpired, wait)
    }

    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush

  return debounced
}

export const throttle = (func: Function, wait: number, options: { leading?: boolean; trailing?: boolean; } = {}) => {
  const leading = !isObject(options) || options.leading !== false
  const trailing = !isObject(options) || options.trailing !== false

  if (!isFunction(func)) {
    throw new TypeError('#<func> is not a function')
  }

  return debounce(func, wait, {
    maxWait: wait,
    leading: leading,
    trailing: trailing,
  })
}

export default {
  debounce,
  throttle,
}
