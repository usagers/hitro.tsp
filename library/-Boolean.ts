export const isBoolean = (bool: unknown): bool is boolean => {
  return bool === true || bool === false
}

export const isFalse = (bool: unknown): bool is false => {
  return bool === false
}

export const isTrue = (bool: unknown): bool is true => {
  return bool === true
}

export default {
  isBoolean,
  isFalse,
  isTrue,
}
