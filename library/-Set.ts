export const isNonEmptySet = (set: unknown): set is Set<unknown> => {
  return isSet(set) && set.size > 0
}

export const isEmptySet = (set: unknown): set is Set<unknown> => {
  return isSet(set) && set.size === 0
}

export const isSet = (set: unknown): set is Set<unknown> => {
  return Object.prototype.toString.call(set) === '[object Set]'
}

export default {
  isNonEmptySet,
  isEmptySet,
  isSet,
}
