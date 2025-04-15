type IPromiseReject = (reason?: any) => void
type IPromiseResolve<T = any> = (value: T | PromiseLike<T>) => void

export interface IPromiser<T = any> extends Promise<T> {
  resolve: IPromiseResolve<T>;
  reject: IPromiseReject;
  promise: Promise<T>;
  completed: boolean;
  fulfilled: boolean;
  rejected: boolean;
  pending: boolean;
}

export const toPromise = <T = unknown>(...rest: Array<unknown>): Promise<T> & IPromiser => {
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

  return promiser as IPromiser<T>
}

export const isPromise = (val: unknown): val is Promise<any> => {
  return Object.prototype.toString.call(val) === '[object Promise]'
}

export default {
  isPromise,
  toPromise,
}
