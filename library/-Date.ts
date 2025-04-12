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
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()

    return format.replace(/YYYY|YY|MM?|DD?|HH?|mm?|ss?s?|ii?i?/gi, type => {
      switch (type) {
        case 'YYYY': return String(year)
        case 'yyyy': return String(year)
        case 'YY': return String(year).slice(-2)
        case 'yy': return String(year).slice(-2)
        case 'MM': return String(month).padStart(2, '0')
        case 'M': return String(month)
        case 'DD': return String(day).padStart(2, '0')
        case 'dd': return String(day).padStart(2, '0')
        case 'D': return String(day)
        case 'd': return String(day)
        case 'HH': return String(hours).padStart(2, '0')
        case 'hh': return String(hours % 12 || 12).padStart(2, '0')
        case 'H': return String(hours)
        case 'h': return String(hours % 12 || 12)
        case 'mm': return String(minutes).padStart(2, '0')
        case 'm': return String(minutes)
        case 'ss': return String(seconds).padStart(2, '0')
        case 's': return String(seconds)
        case 'sss': return String(milliseconds).padStart(3, '0')
        case 'iii': return String(milliseconds).padStart(3, '0')
        case 'ii': return String(Math.floor(milliseconds / 10)).padStart(2, '0')
        case 'i': return String(Math.floor(milliseconds / 100))
      }
      return type
    })
  }

  return ''
}

export default {
  isValidDate,
  dateFormat,
  isDate,
}
