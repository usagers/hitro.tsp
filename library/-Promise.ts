type PromiseReject = (reason?: any) => void
type PromiseResolve<T = any> = (value: T | PromiseLike<T>) => void

export interface PromiseExtension<T = any> extends Promise<T> {
  resolve: PromiseResolve<T>;
  reject: PromiseReject;
  promise: Promise<T>;
  completed: boolean;
  fulfilled: boolean;
  rejected: boolean;
  pending: boolean;
}

export const toPromise = <T = unknown>(...rest: Array<unknown>): Promise<T> & PromiseExtension => {
  const { promise, resolve, reject } = Promise.withResolvers<T>()

  let promiser = Promise.race([...rest, promise]) as any

  promiser = promiser.then((value: T | PromiseLike<T>) => {
    promiser.pending = false
    promiser.rejected = false
    promiser.fulfilled = true
    promiser.completed = true
    return value
  })

  promiser = promiser.catch((reason: any) => {
    promiser.pending = false
    promiser.rejected = true
    promiser.fulfilled = false
    promiser.completed = true
    return Promise.reject(reason)
  })

  promiser = Object.assign(promiser, {
    reject: reject,
    resolve: resolve,
    promise: promiser,
    completed: false,
    fulfilled: false,
    rejected: false,
    pending: true,
  })

  return promiser as PromiseExtension<T>
}

export const isPromise = (val: unknown): val is Promise<any> => {
  return Object.prototype.toString.call(val) === '[object Promise]'
}

export default {
  isPromise,
  toPromise,
}
