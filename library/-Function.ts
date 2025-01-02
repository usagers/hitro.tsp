type AsyncFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>

export const isGeneratorFunction = (func: unknown): func is GeneratorFunction => {
  return Object.prototype.toString.call(func) === '[object GeneratorFunction]'
}

export const isAsyncFunction = (func: unknown): func is AsyncFunction => {
  return Object.prototype.toString.call(func) === '[object AsyncFunction]'
}

export const isNormalFunction = (func: unknown): func is Function => {
  return Object.prototype.toString.call(func) === '[object Function]'
}

export const isFunction = (func: unknown): func is Function => {
  return isNormalFunction(func) || isAsyncFunction(func) || isGeneratorFunction(func)
}

export default {
  isGeneratorFunction,
  isNormalFunction,
  isAsyncFunction,
  isFunction,
}
