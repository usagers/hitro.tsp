import { isFinite } from './-Number'
import { isString } from './-String'

export const isSymbol = (val: unknown): val is symbol => {
  return Object.prototype.toString.call(val) === '[object Symbol]'
}

export const toSymbolFor = (val?: unknown): symbol => {
  if (isSymbol(val) && isString(Symbol.keyFor(val))) {
    return val
  }

  if (isString(val) || isFinite(val)) {
    return Symbol.for(val + '')
  }

  return Symbol.for('undefined')
}

export const toSymbol = (val?: unknown): symbol => {
  if (!isSymbol(val) && isString(val)) {
    return Symbol(val)
  }

  if (!isSymbol(val) && isFinite(val)) {
    return Symbol(val)
  }

  if (!isSymbol(val)) {
    return Symbol()
  }

  return val
}

export default {
  isSymbol,
  toSymbol,
  toSymbolFor,
}
