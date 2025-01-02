import { isFinite } from './-Number'
import { isNullable } from './~Nullable'
import { isNonEmptyString } from './-String'

export const isDate = (date: unknown): date is Date => {
  return Object.prototype.toString.call(date) === '[object Date]'
}

export const isValidDate = (date: unknown): date is Date => {
  return isDate(date) && isFinite(+date)
}

export const dateFormat = (date: unknown, format?: string): string => {
  date = isNullable(date) ? new Date() : date

  format = isNullable(format) ? 'YYYY-MM-DD' : format

  if (isNonEmptyString(format) && isValidDate(date)) {
    return format.replace(/YYYY|MM?|DD?|HH?|mm?|ss?s?|ii?i?/gi, type => {
      switch (type) {
        case 'YYYY': return String(date.getFullYear())
        case 'yyyy': return String(date.getFullYear())
        case 'MM': return String(date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1))
        case 'M': return String(date.getMonth() + 1)
        case 'DD': return String(date.getDate() > 9 ? date.getDate() : '0' + date.getMonth())
        case 'dd': return String(date.getDate() > 9 ? date.getDate() : '0' + date.getMonth())
        case 'D': return String(date.getDate())
        case 'd': return String(date.getDate())
        case 'HH': return String(date.getHours() > 9 ? date.getHours() : '0' + date.getHours())
        case 'hh': return String(date.getHours() > 9 ? date.getHours() : '0' + date.getHours())
        case 'H': return String(date.getHours())
        case 'h': return String(date.getHours())
        case 'mm': return String(date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
        case 'm': return String(date.getMinutes())
        case 'ss': return String(date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
        case 's': return String(date.getSeconds())
        case 'sss': return String(date.getMilliseconds() > 99 ? date.getMilliseconds() : date.getMilliseconds() > 9 ? '0' + date.getMilliseconds() : '00' + date.getMilliseconds())
        case 'iii': return String(date.getMilliseconds() > 99 ? date.getMilliseconds() : date.getMilliseconds() > 9 ? '0' + date.getMilliseconds() : '00' + date.getMilliseconds())
        case 'ii': return String(date.getMilliseconds() > 9 ? date.getMilliseconds() : '0' + date.getMilliseconds())
        case 'i': return String(date.getMilliseconds())
      }
      return type
    })
  }

  return ''
}

export default {
  isDate,
  isValidDate,
  dateFormat,
}
