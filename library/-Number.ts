export const isNaN = (num: unknown): num is number => {
  return Number.isNaN(num)
}

export const isNumber = (num: unknown): num is number => {
  return Object.prototype.toString.call(num) === '[object Number]'
}

export const isFinite = (num: unknown): num is number => {
  return isNumber(num) && Number.isFinite(num)
}

export const isDecimal = (num: unknown): num is number => {
  return isFinite(num) && !Number.isInteger(num)
}

export const isInteger = (num: unknown): num is number => {
  return isFinite(num) && Number.isInteger(num)
}

export const isInfinity = (num: unknown): num is number => {
  return num === Infinity || num === -Infinity
}

export const isSafeNumber = (num: unknown): num is number => {
  return isFinite(num) && num <= Number.MAX_SAFE_INTEGER && num >= Number.MIN_SAFE_INTEGER
}

export const isSafeInteger = (num: unknown): num is number => {
  return isFinite(num) && Number.isSafeInteger(num)
}

export const toSafeInteger = (num?: unknown, _?: never): number => {
  if (+num! >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER
  }

  if (+num! <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER
  }

  if (isInteger(+num!)) {
    return +num!
  }

  if (+num! > 0) {
    return Math.floor(+num!)
  }

  if (+num! < 0) {
    return Math.ceil(+num!)
  }

  return 0
}

export const toSafeNumber = (num?: unknown, _?: never): number => {
  if (+num! >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER
  }

  if (+num! <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER
  }

  if (isFinite(+num!)) {
    return +num!
  }

  return 0
}

export const toInteger = (num?: unknown, _?: never): number => {
  if (isInteger(+num!)) {
    return +num!
  }

  if (isFinite(+num!)) {
    return +num! > 0 ? Math.floor(+num!) : Math.ceil(+num!)
  }

  return 0
}

export const toFinite = (num?: unknown, lie = NaN): number => {
  if (isFinite(+num!) && isInteger(+num!)) {
    return +num!
  }

  if (isFinite(+num!) && !isNaN(lie)) {
    return +toFixed(+num!, lie)
  }

  if (isFinite(+num!)) {
    return +num!
  }

  return 0
}

export const toNumber = (num?: unknown, lie = NaN): number => {
  if (isNumber(+num!) && isInteger(+num!)) {
    return +num!
  }

  if (isNumber(+num!) && !isNaN(lie)) {
    return +toFixed(+num!, lie)
  }

  if (isNumber(+num!)) {
    return +num!
  }

  return 0
}

export const toFixed = (num?: unknown, lie = NaN): string => {
  if (+num! === Infinity) {
    return 'Infinity'
  }

  if (+num! === -Infinity) {
    return '-Infinity'
  }

  num = +num!
  lie = lie >= 0 ? lie : NaN
  lie = isSafeInteger(lie) ? lie : NaN

  if (isFinite(num) && !isNaN(lie)) {
    const pow = Math.pow(10, lie)
    const data = Math.round(pow * num)
    const number = String(data / pow)

    if (isDecimal(+number)) {
      return number.split('.')[0] + '.' + number.split('.')[1].padEnd(lie, '0')
    }

    if (isInteger(+number)) {
      return number + '.' + ''.padEnd(lie, '0')
    }
  }

  if (isFinite(num) && isNaN(lie)) {
    return num + ''
  }

  return ''
}

export default {
  isNaN,
  isNumber,
  isFinite,
  isDecimal,
  isInteger,
  isInfinity,
  isSafeNumber,
  isSafeInteger,
  toSafeInteger,
  toSafeNumber,
  toInteger,
  toFinite,
  toNumber,
  toFixed,
}
