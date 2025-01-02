import { isString } from './-String'

export const isRegExp = (reg: unknown): reg is RegExp => {
  return Object.prototype.toString.call(reg) === '[object RegExp]'
}

export const toRegExp = (reg: unknown, flags?: string): RegExp => {
  if (isRegExp(reg)) {
    return new RegExp(reg.source, flags ?? reg.flags)
  }

  if (isString(reg)) {
    return new RegExp(reg, flags)
  }

  return /(?:)/
}

export default {
  isRegExp,
  toRegExp,
}
