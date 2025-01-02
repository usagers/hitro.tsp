export type UniquerOptions = {
  radix?: 2 | 8 | 10 | 16 | 26 | 36;
  format?: string | null;
  random?: '?' | '*' | '#';
  uniques?: Array<string> | Set<string> | null;
}

export type RandomizeOptions = {
  bytes: string[];
  max: number;
  min: number;
}

export type Randomize = (options: RandomizeOptions) => string
export type Unique = (options?: UniquerOptions) => string

const Cacher: Set<string> = new Set([''])

export const unique: Unique = (options = {}) => {
  const radix = options.radix !== undefined ? options.radix : 16
  const random = options.random !== undefined ? options.random : '?'
  const format = options.format !== undefined ? options.format : ('????????-????-[1-5]???-[8-b]???-????????????').replace(/\?/g, random)
  const uniques = options.uniques !== undefined ? options.uniques : null

  if (![2, 8, 10, 16, 26, 36].includes(radix)) {
    throw new Error('#<Options.radix> is not in [2, 8, 10, 16, 26, 36]')
  }

  if (!['?', '*', '#'].includes(random)) {
    throw new Error('#<Options.random> is not in ["?", "*", "#"]')
  }

  if (String(format) !== format) {
    throw new Error('#<Options.format> is not string')
  }

  if (uniques instanceof Array) {
    uniques.forEach(key => typeof key === 'string' && Cacher.add(key))
  }

  if (uniques instanceof Set) {
    uniques.forEach(key => typeof key === 'string' && Cacher.add(key))
  }

  let uuid = ''
  let tryCount = 10
  let regenerate = true
  const byteOffset = radix === 26 ? 10 : 0
  const characters = Array.from({ length: 36 }, (_, key) => key.toString(36))
  const appendCacher = Cacher.add.bind(Cacher)

  const randomizer: Randomize = opt => {
    const min = opt.min
    const max = opt.max
    const bytes = opt.bytes
    return bytes[Math.random() * (max - min + 1) + min | 0]
  }

  while (regenerate && tryCount-- > 0) {
    const template = format.replace(/\[([^\]]+?)\]/g, (_, group: string) => {
      const caches: Set<string> = new Set()
      const append = caches.add.bind(caches)
      const splits = group.toLowerCase().split(/\s*,\s*/g)
      const filters = splits.filter(str => /^[a-zA-Z0-9\s/|\-*?#=:;]+$/ui.test(str))
      const isRange = (str: string) => /^\s*[a-zA-Z0-9]\s*-\s*[a-zA-Z0-9]\s*$/.test(str)

      const collects = filters.reduce((caches, string) => {
        if (isRange(string.trim())) {
          const str1 = string.trim().split(/\s*-\s*/)[0]
          const str2 = string.trim().split(/\s*-\s*/)[1]
          const key1 = characters.indexOf(str1.trim())
          const key2 = characters.indexOf(str2.trim())
          const first = Math.min(key1, key2)
          const second = Math.max(key1, key2) + 1
          characters.slice(first, second).forEach(append)
        }

        if (!isRange(string.trim())) {
          append(string.trim())
        }

        return caches
      }, caches)

      const temp = Array.from(collects)
      const bytes = temp.filter(every => !!every)

      return randomizer({
        bytes,
        max: bytes.length - 1,
        min: 0,
      })
    })

    const min = 0
    const max = radix - 1
    const bytes = characters.slice(byteOffset)

    uuid = [...template.toLowerCase()]
      .filter(str => /^[a-zA-Z0-9\s/|\-*?#=:;]+$/ui.test(str))
      .map(v => v === random ? randomizer({ bytes, max, min }) : v)
      .join('')
      .trim()

    if (!Cacher.has(uuid)) {
      regenerate = false
      appendCacher(uuid)
    }
  }

  if (regenerate) {
    throw new Error('[Uniquer generate uuid] is Reduplicated')
  }

  return uuid
}

export default {
  unique,
}
