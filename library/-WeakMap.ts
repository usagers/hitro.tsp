export const isWeakMap = (map: unknown): map is WeakMap<object, unknown> => {
  return Object.prototype.toString.call(map) === '[object WeakMap]'
}

export default {
  isWeakMap,
}
