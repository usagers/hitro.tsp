import { isSet } from './-Set'
import { isMap } from './-Map'
import { isDate } from './-Date'
import { isArray } from './-Array'
import { isObject } from './-Object'
import { isRegExp } from './-RegExp'
import { isString } from './-String'
import { isFinite } from './-Number'
import { isNumber } from './-Number'
import { toInteger } from './-Number'
import { isWeakMap } from './-WeakMap'
import { isNullable } from './~Nullable'

export type DeepType = boolean | number
export type FilterTypes = Array<string | number | RegExp>
export type CloneOptionsType = { omit?: FilterTypes; pick?: FilterTypes; cache?: WeakMap<object, unknown>; deep?: DeepType; }
export type EqualOptionsType = { strict?: FilterTypes; include?: FilterTypes; exclude?: FilterTypes; deep?: DeepType; }

export const equal = (one: unknown, two: unknown, opts: EqualOptionsType | DeepType = true): boolean => {
  if (one === two) {
    return true
  }

  if (Object.is(one, two)) {
    return true
  }

  if (isSet(one) && isSet(two)) {
    return one.size === two.size && equal(Array.from(one), Array.from(two), opts)
  }

  if (isMap(one) && isMap(two)) {
    return one.size === two.size && equal(Array.from(one), Array.from(two), opts)
  }

  if (isNumber(one) && isNumber(two)) {
    return Math.abs(one - two) < Number.EPSILON
  }

  const deep = isObject(opts) ? opts.deep : opts
  const level = isNullable(deep) || deep === true || deep === Infinity ? Infinity : toInteger(deep)
  const include = isObject(opts) && isArray(opts.include) ? opts.include.filter(key => isRegExp(key) || isFinite(key) || isString(key)) : [/(?:)/]
  const exclude = isObject(opts) && isArray(opts.exclude) ? opts.exclude.filter(key => isRegExp(key) || isFinite(key) || isString(key)) : []
  const strict = isObject(opts) && isArray(opts.strict) ? opts.strict.filter(key => isRegExp(key) || isFinite(key) || isString(key)) : []

  if (!isNumber(level) || level < 1) {
    return false
  }

  if (isRegExp(one) && isRegExp(two)) {
    return one.source === two.source && one.flags === two.flags && one.lastIndex === two.lastIndex
  }

  if (isObject(one) && isObject(two)) {
    const oneKeys = Object.keys(one).filter(key => {
      const excluded = exclude.length > 0 && exclude.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const included = include.length === 0 || include.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      return !excluded && included
    })

    const twoKeys = Object.keys(two).filter(key => {
      const excluded = exclude.length > 0 && exclude.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const included = include.length === 0 || include.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      return !excluded && included
    })

    if (oneKeys.length !== twoKeys.length) {
      return false
    }

    for (const key of Object.keys(one)) {
      const val1 = one[key]
      const val2 = two[key]
      const deep = level - 1
      const stricted = strict.length > 0 && strict.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const excluded = exclude.length > 0 && exclude.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const included = include.length === 0 || include.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))

      if (excluded || !included) {
        continue
      }

      if (val1 === val2) {
        continue
      }

      if (stricted) {
        return false
      }

      if (deep < 1) {
        return false
      }

      const result = equal(val1, val2, {
        strict,
        include,
        exclude,
        deep,
      })

      if (!result) {
        return false
      }
    }

    return true
  }

  if (isArray(one) && isArray(two)) {
    const oneKeys = Object.keys(one).filter(key => {
      const excluded = exclude.length > 0 && exclude.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const included = include.length === 0 || include.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      return !excluded && included
    })

    const twoKeys = Object.keys(two).filter(key => {
      const excluded = exclude.length > 0 && exclude.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const included = include.length === 0 || include.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      return !excluded && included
    })

    if (oneKeys.length !== twoKeys.length) {
      return false
    }

    for (const key of one.keys()) {
      const val1 = one[key]
      const val2 = two[key]
      const deep = level - 1
      const stricted = strict.length > 0 && strict.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const excluded = exclude.length > 0 && exclude.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))
      const included = include.length === 0 || include.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))

      if (excluded || !included) {
        continue
      }

      if (val1 === val2) {
        continue
      }

      if (stricted) {
        return false
      }

      if (deep < 1) {
        return false
      }

      const result = equal(val1, val2, {
        strict,
        include,
        exclude,
        deep,
      })

      if (!result) {
        return false
      }
    }

    return true
  }

  if (isDate(one) && isDate(two)) {
    return Object.is(one.getTime(), two.getTime())
  }

  return false
}

export const clone = <T = unknown>(val: T, opts: CloneOptionsType | DeepType = true): T => {
  const deep = isObject(opts) ? opts.deep : opts
  const cache = isObject(opts) && isWeakMap(opts.cache) ? opts.cache : new WeakMap()
  const level = isNullable(deep) || deep === true || deep === Infinity ? Infinity : Math.max(toInteger(deep), 1)

  const omit = isObject(opts) && isArray(opts.omit) ? opts.omit.filter(key => isRegExp(key) || isString(key) || isFinite(key)) : []
  const pick = isObject(opts) && isArray(opts.pick) ? opts.pick.filter(key => isRegExp(key) || isString(key) || isFinite(key)) : []

  const cloning = (val: T, level: number): T => {
    const value: any = isArray(val) ? [] : {}

    for (const [key, source] of taking(val)) {
      if (pick.length > 0 && !pick.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))) {
        continue
      }

      if (omit.length > 0 && omit.some(k => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))) {
        continue
      }

      let record = source

      const isCopySet = isSet(source)
      const isCopyMap = isMap(source)
      const isCopyDate = isDate(source)
      const isCopyArray = isArray(source)
      const isCopyObject = isObject(source)
      const isCopyRegExp = isRegExp(source)

      if (!isCopySet && !isCopyMap && !isCopyDate && !isCopyArray && !isCopyObject && !isCopyRegExp) {
        if (isArray(value)) value.push(record)
        if (!isArray(value)) value[key] = record
        continue
      }

      if (level > 1 && !cache.has(source)) {
        cache.set(source, clone(source, { omit, pick, cache, deep: level - 1 }))
      }

      if (level > 1 && cache.has(source)) {
        record = cache.get(source)
      }

      if (isArray(value)) value.push(record)
      if (!isArray(value)) value[key] = record
    }

    return value as T
  }

  const taking = (val: any): any[] => {
    return isObject(val) ? Object.entries(val) : val.entries()
  }

  if (!isNumber(level) || level < 1) {
    return val
  }

  if (isRegExp(val)) {
    const flags = val.flags
    const source = val.source
    const regexp = new RegExp(source, flags)
    regexp.lastIndex = val.lastIndex
    return regexp as T
  }

  if (isObject(val)) {
    return cloning(val, level)
  }

  if (isArray(val)) {
    return cloning(val, level)
  }

  if (isDate(val)) {
    return new Date(+val) as T
  }

  if (isMap(val)) {
    const maps = Array.from(val.entries()) as any
    return new Map(cloning(maps, level) as any) as T
  }

  if (isSet(val)) {
    const sets = Array.from(val.values()) as any
    return new Set(cloning(sets, level) as any) as T
  }

  return val
}

export const merge = <T = unknown>(val: T, ...rest: any[]) => {
  const empty = {}
  const cache = new WeakMap()
  const state = rest.slice(-1)[0]
  const level = isNumber(state) && state !== Infinity ? Math.max(toInteger(state), 1) : (state !== false ? Infinity : 1)

  const taking = (val: any) => {
    return isObject(val) ? Object.entries(val) : val.entries()
  }

  const merging = (val: T, obj: T, level: number) => {
    const refer: any = isMap(val) || isSet(val) ? Array.from(val) : val
    const newly: any = isMap(obj) || isSet(obj) ? Array.from(obj) : obj

    for (const [key, source] of taking(newly)) {
      if (level < 1) {
        refer[key] = source
        continue
      }

      const isCopySet = isSet(source)
      const isCopyMap = isMap(source)
      const isCopyDate = isDate(source)
      const isCopyArray = isArray(source)
      const isCopyObject = isObject(source)
      const isCopyRegExp = isRegExp(source)
      const isNotSameType = empty.toString.call(refer[key]) !== empty.toString.call(source)

      if (!isCopySet && !isCopyMap && !isCopyDate && !isCopyArray && !isCopyObject && !isCopyRegExp) {
        refer[key] = source
        continue
      }

      if (!cache.has(source)) {
        cache.set(source, clone(source, { deep: level, cache }))
      }

      if (isNotSameType) {
        refer[key] = cache.get(source)
        continue
      }

      merging(refer[key], newly[key], level - 1)
    }

    if (isMap(val) || isSet(val)) {
      val.clear()
    }

    if (isMap(val)) {
      for (const [key, source] of refer) {
        val.set(key, source)
      }
    }

    if (isSet(val)) {
      for (const source of refer) {
        val.add(source)
      }
    }
  }

  if (isObject(val) || isArray(val) || isMap(val) || isSet(val)) {
    for (const obj of rest) {
      if (empty.toString.call(val) !== empty.toString.call(obj)) {
        continue
      }
      merging(val, obj, level - 1)
    }
  }

  return val
}

export const check = (one: unknown, two: unknown) => {
  return Object.is(one, two)
}

export default {
  clone,
  equal,
  merge,
  check,
}
