type PromiseReject = (reason?: any) => void
type PromiseResolve<T = any> = (value: T | PromiseLike<T>) => void
type PromiseExtension<T = any> = { promise: Promise<T>; resolve: PromiseResolve<T>; reject: PromiseReject; }

export const toPromise = <T = unknown>(...rest: Array<unknown>): Promise<T> & PromiseExtension => {
  const { promise, resolve, reject } = Promise.withResolvers<T>()

  const promiser = Promise.race([...rest, promise]) as any

  return Object.assign(promiser, {
    promise: promiser,
    resolve: resolve,
    reject: reject,
  })
}

export const isPromise = (val: unknown): val is Promise<any> => {
  return Object.prototype.toString.call(val) === '[object Promise]'
}

export default {
  isPromise,
  toPromise,
}
