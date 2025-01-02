export const isNonEmptyMap = (map: unknown): map is Map<unknown, unknown> => {
  return isMap(map) && map.size > 0
}

export const isEmptyMap = (map: unknown): map is Map<unknown, unknown> => {
  return isMap(map) && map.size === 0
}

export const isMap = (map: unknown): map is Map<unknown, unknown> => {
  return Object.prototype.toString.call(map) === '[object Map]'
}

export default {
  isNonEmptyMap,
  isEmptyMap,
  isMap,
}
