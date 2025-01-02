export const isWeakSet = (set?: unknown): set is WeakSet<object> => {
  return Object.prototype.toString.call(set) === '[object WeakSet]'
}

export default {
  isWeakSet,
}
