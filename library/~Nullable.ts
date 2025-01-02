export const isNullable = (val: unknown): val is null | undefined => {
  return isUndef(val) || isNull(val)
}

export const isUndef = (val: unknown): val is undefined => {
  return Object.prototype.toString.call(val) === '[object Undefined]'
}

export const isNull = (val: unknown): val is null => {
  return Object.prototype.toString.call(val) === '[object Null]'
}

export default {
  isNullable,
  isUndef,
  isNull,
}
