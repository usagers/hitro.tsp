export const isNonEmptyObject = (obj: unknown): obj is Record<string, unknown> => {
  return isObject(obj) && Object.keys(obj).length > 0
}

export const isEmptyObject = (obj: unknown): obj is Record<string, unknown> => {
  return isObject(obj) && Object.keys(obj).length === 0
}

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export default {
  isNonEmptyObject,
  isEmptyObject,
  isObject,
}
