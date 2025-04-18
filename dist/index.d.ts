type IPromiseReject = (reason?: any) => void;
type IPromiseResolve<T = any> = (value: T | PromiseLike<T>) => void;
interface IPromiser<T = any> extends Promise<T> {
    resolve: IPromiseResolve<T>;
    reject: IPromiseReject;
    promise: Promise<T>;
    completed: boolean;
    fulfilled: boolean;
    rejected: boolean;
    pending: boolean;
}
declare const toPromise: <T = unknown>(...rest: Array<unknown>) => Promise<T> & IPromiser;
declare const isPromise: (val: unknown) => val is Promise<any>;

interface Curry {
    <T1, R>(func: (this: any, t1: T1) => R, length?: number): CurryFn1<T1, R>;
    <T1, T2, R>(func: (this: any, t1: T1, t2: T2) => R, length?: number): CurryFn2<T1, T2, R>;
    <T1, T2, T3, R>(func: (this: any, t1: T1, t2: T2, t3: T3) => R, length?: number): CurryFn3<T1, T2, T3, R>;
    <T1, T2, T3, T4, R>(func: (this: any, t1: T1, t2: T2, t3: T3, t4: T4) => R, length?: number): CurryFn4<T1, T2, T3, T4, R>;
    <T1, T2, T3, T4, T5, R>(func: (this: any, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R, length?: number): CurryFn5<T1, T2, T3, T4, T5, R>;
    (func: (this: any, ...args: any[]) => any, length?: number): (this: any, ...args: any[]) => any;
}
interface CurryFn1<T1, R> {
    (this: any): CurryFn1<T1, R>;
    (this: any, t1: T1): R;
}
interface CurryFn2<T1, T2, R> {
    (this: any): CurryFn2<T1, T2, R>;
    (this: any, t1: T1): CurryFn1<T2, R>;
    (this: any, t1: Curry, t2: T2): CurryFn1<T1, R>;
    (this: any, t1: T1, t2: T2): R;
}
interface CurryFn3<T1, T2, T3, R> {
    (this: any): CurryFn3<T1, T2, T3, R>;
    (this: any, t1: T1): CurryFn2<T2, T3, R>;
    (this: any, t1: Curry, t2: T2): CurryFn2<T1, T3, R>;
    (this: any, t1: T1, t2: T2): CurryFn1<T3, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3): CurryFn2<T1, T2, R>;
    (this: any, t1: T1, t2: Curry, t3: T3): CurryFn1<T2, R>;
    (this: any, t1: Curry, t2: T2, t3: T3): CurryFn1<T1, R>;
    (this: any, t1: T1, t2: T2, t3: T3): R;
}
interface CurryFn4<T1, T2, T3, T4, R> {
    (this: any): CurryFn4<T1, T2, T3, T4, R>;
    (this: any, t1: T1): CurryFn3<T2, T3, T4, R>;
    (this: any, t1: Curry, t2: T2): CurryFn3<T1, T3, T4, R>;
    (this: any, t1: T1, t2: T2): CurryFn2<T3, T4, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3): CurryFn3<T1, T2, T4, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3): CurryFn2<T2, T4, R>;
    (this: any, t1: Curry, t2: T2, t3: T3): CurryFn2<T1, T4, R>;
    (this: any, t1: T1, t2: T2, t3: T3): CurryFn1<T4, R>;
    (this: any, t1: Curry, t2: Curry, t3: Curry, t4: T4): CurryFn3<T1, T2, T3, R>;
    (this: any, t1: T1, t2: Curry, t3: Curry, t4: T4): CurryFn2<T2, T3, R>;
    (this: any, t1: Curry, t2: T2, t3: Curry, t4: T4): CurryFn2<T1, T3, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3, t4: T4): CurryFn2<T1, T2, R>;
    (this: any, t1: T1, t2: T2, t3: Curry, t4: T4): CurryFn1<T3, R>;
    (this: any, t1: T1, t2: Curry, t3: T3, t4: T4): CurryFn1<T2, R>;
    (this: any, t1: Curry, t2: T2, t3: T3, t4: T4): CurryFn1<T1, R>;
    (this: any, t1: T1, t2: T2, t3: T3, t4: T4): R;
}
interface CurryFn5<T1, T2, T3, T4, T5, R> {
    (this: any): CurryFn5<T1, T2, T3, T4, T5, R>;
    (this: any, t1: T1): CurryFn4<T2, T3, T4, T5, R>;
    (this: any, t1: Curry, t2: T2): CurryFn4<T1, T3, T4, T5, R>;
    (this: any, t1: T1, t2: T2): CurryFn3<T3, T4, T5, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3): CurryFn4<T1, T2, T4, T5, R>;
    (this: any, t1: T1, t2: Curry, t3: T3): CurryFn3<T2, T4, T5, R>;
    (this: any, t1: Curry, t2: T2, t3: T3): CurryFn3<T1, T4, T5, R>;
    (this: any, t1: T1, t2: T2, t3: T3): CurryFn2<T4, T5, R>;
    (this: any, t1: Curry, t2: Curry, t3: Curry, t4: T4): CurryFn4<T1, T2, T3, T5, R>;
    (this: any, t1: T1, t2: Curry, t3: Curry, t4: T4): CurryFn3<T2, T3, T5, R>;
    (this: any, t1: Curry, t2: T2, t3: Curry, t4: T4): CurryFn3<T1, T3, T5, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3, t4: T4): CurryFn3<T1, T2, T5, R>;
    (this: any, t1: T1, t2: T2, t3: Curry, t4: T4): CurryFn2<T3, T5, R>;
    (this: any, t1: T1, t2: Curry, t3: T3, t4: T4): CurryFn2<T2, T5, R>;
    (this: any, t1: Curry, t2: T2, t3: T3, t4: T4): CurryFn2<T1, T5, R>;
    (this: any, t1: T1, t2: T2, t3: T3, t4: T4): CurryFn1<T5, R>;
    (this: any, t1: Curry, t2: Curry, t3: Curry, t4: Curry, t5: T5): CurryFn4<T1, T2, T3, T4, R>;
    (this: any, t1: T1, t2: Curry, t3: Curry, t4: Curry, t5: T5): CurryFn3<T2, T3, T4, R>;
    (this: any, t1: Curry, t2: T2, t3: Curry, t4: Curry, t5: T5): CurryFn3<T1, T3, T4, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3, t4: Curry, t5: T5): CurryFn3<T1, T2, T4, R>;
    (this: any, t1: Curry, t2: Curry, t3: Curry, t4: T4, t5: T5): CurryFn3<T1, T2, T3, R>;
    (this: any, t1: T1, t2: T2, t3: Curry, t4: Curry, t5: T5): CurryFn2<T3, T4, R>;
    (this: any, t1: T1, t2: Curry, t3: T3, t4: Curry, t5: T5): CurryFn2<T2, T4, R>;
    (this: any, t1: T1, t2: Curry, t3: Curry, t4: T4, t5: T5): CurryFn2<T2, T3, R>;
    (this: any, t1: Curry, t2: T2, t3: T3, t4: Curry, t5: T5): CurryFn2<T1, T4, R>;
    (this: any, t1: Curry, t2: T2, t3: Curry, t4: T4, t5: T5): CurryFn2<T1, T3, R>;
    (this: any, t1: Curry, t2: Curry, t3: T3, t4: T4, t5: T5): CurryFn2<T1, T2, R>;
    (this: any, t1: T1, t2: T2, t3: T3, t4: Curry, t5: T5): CurryFn1<T4, R>;
    (this: any, t1: T1, t2: T2, t3: Curry, t4: T4, t5: T5): CurryFn1<T3, R>;
    (this: any, t1: T1, t2: Curry, t3: T3, t4: T4, t5: T5): CurryFn1<T2, R>;
    (this: any, t1: Curry, t2: T2, t3: T3, t4: T4, t5: T5): CurryFn1<T1, R>;
    (this: any, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}
declare const curry: Curry;

type IDeep = boolean | number;
type IFilter = Array<string | number | RegExp>;
type ICloneOptions = {
    omit?: IFilter;
    pick?: IFilter;
    cache?: WeakMap<object, unknown>;
    deep?: IDeep;
};
type IEqualOptions = {
    strict?: IFilter;
    include?: IFilter;
    exclude?: IFilter;
    deep?: IDeep;
};
declare const equal: (one: unknown, two: unknown, opts?: IEqualOptions | IDeep) => boolean;
declare const clone: <T = unknown>(val: T, opts?: ICloneOptions | IDeep) => T;
declare const merge: <T = unknown>(val: T, ...rest: any[]) => T;
declare const check: (one: unknown, two: unknown) => boolean;

interface IReadonlySignal<T = any> {
    readonly value: T;
    subscribe(fn: (value: T) => void): () => void;
    toString(): string;
    valueOf(): T;
    toJSON(): T;
    peek(): T;
}
interface INewSignal<T = any> {
    <P = T>(value: P): Signal<P>;
    <P = undefined>(): Signal<P | undefined>;
}
interface IEffectFn {
    (): void | (() => void);
}
interface INode {
    signal: Signal;
    target: Computed | Effect;
    rollbackNode?: INode;
    prevSource?: INode;
    nextSource?: INode;
    prevTarget?: INode;
    nextTarget?: INode;
    version: number;
}
declare class Effect {
    fn?: IEffectFn;
    nextEffect?: Effect;
    cleanup?: () => void;
    source?: INode;
    flags: number;
    constructor(fn: IEffectFn);
    callback(): void;
    dispose(): void;
    notify(): void;
    clean(): void;
    start(): () => void;
}
declare class Signal<T = any> {
    val?: T;
    err?: unknown;
    node?: INode;
    target?: INode;
    version: number;
    get value(): T;
    set value(val: T);
    constructor(val?: T);
    addNode(node: INode): void;
    delNode(node: INode): void;
    subscribe(fn: (value: T) => void): () => void;
    dependency(): INode | undefined;
    refresh(): boolean;
    toString(): string;
    valueOf(): T;
    toJSON(): T;
    peek(): T;
}
declare class Computed<T = any> extends Signal<T> {
    globalVersion: number;
    source?: INode;
    flags: number;
    fn: () => T;
    get value(): T;
    constructor(fn: () => T);
    addNode(node: INode): void;
    delNode(node: INode): void;
    refresh(): boolean;
    notify(): void;
}
declare const untracked: <T = void>(fn: () => T) => T;
declare const computed: <T = void>(fn: () => T) => IReadonlySignal<T>;
declare const effect: <T = void>(fn: IEffectFn) => () => T;
declare const signal: INewSignal;
declare const batch: <T = void>(fn: () => T) => T;

type IUniquerOptions = {
    radix?: 2 | 8 | 10 | 16 | 26 | 36;
    format?: string | null;
    random?: '?' | '*' | '#';
    uniques?: Array<string> | Set<string> | null;
};
type IRandomizeOptions = {
    bytes: string[];
    max: number;
    min: number;
};
type IRandomize = (options: IRandomizeOptions) => string;
type IUnique = (options?: IUniquerOptions) => string;
declare const unique: IUnique;

declare const isNonEmptySet: (set: unknown) => set is Set<unknown>;
declare const isEmptySet: (set: unknown) => set is Set<unknown>;
declare const isSet: (set: unknown) => set is Set<unknown>;

declare const isNonEmptyMap: (map: unknown) => map is Map<unknown, unknown>;
declare const isEmptyMap: (map: unknown) => map is Map<unknown, unknown>;
declare const isMap: (map: unknown) => map is Map<unknown, unknown>;

declare const isDate: (date: unknown) => date is Date;
declare const isValidDate: (date: unknown) => date is Date;
declare const dateFormat: (date: unknown, format?: string) => string;

declare const isReferenceError: (err: unknown) => err is ReferenceError;
declare const isSyntaxError: (err: unknown) => err is SyntaxError;
declare const isRangeError: (err: unknown) => err is RangeError;
declare const isEvalError: (err: unknown) => err is EvalError;
declare const isTypeError: (err: unknown) => err is TypeError;
declare const isURIError: (err: unknown) => err is URIError;
declare const isError: (err: unknown) => err is Error;

declare const isNonEmptyArray: (arr: unknown) => arr is any[];
declare const isEmptyArray: (arr: unknown) => arr is any[];
declare const isArray: (arr: unknown) => arr is any[];

declare const isNaN: (num: unknown) => num is number;
declare const isNumber: (num: unknown) => num is number;
declare const isFinite: (num: unknown) => num is number;
declare const isDecimal: (num: unknown) => num is number;
declare const isInteger: (num: unknown) => num is number;
declare const isInfinity: (num: unknown) => num is number;
declare const isSafeNumber: (num: unknown) => num is number;
declare const isSafeInteger: (num: unknown) => num is number;
declare const toSafeInteger: (num?: unknown, _?: never) => number;
declare const toSafeNumber: (num?: unknown, _?: never) => number;
declare const toInteger: (num?: unknown, _?: never) => number;
declare const toFinite: (num?: unknown, lie?: number) => number;
declare const toNumber: (num?: unknown, lie?: number) => number;
declare const toFixed: (num?: unknown, lie?: number) => string;

declare const isNonEmptyObject: (obj: unknown) => obj is Record<string, unknown>;
declare const isEmptyObject: (obj: unknown) => obj is Record<string, unknown>;
declare const isObject: (obj: unknown) => obj is Record<string, unknown>;

declare const isRegExp: (reg: unknown) => reg is RegExp;
declare const toRegExp: (reg: unknown, flags?: string) => RegExp;

declare const isSymbol: (val: unknown) => val is symbol;
declare const toSymbolFor: (val?: unknown) => symbol;
declare const toSymbol: (val?: unknown) => symbol;

declare const isNonEmptyString: (str: unknown) => str is string;
declare const isEmptyString: (str: unknown) => str is string;
declare const isString: (str: unknown) => str is string;

declare const isBoolean: (bool: unknown) => bool is boolean;
declare const isFalse: (bool: unknown) => bool is false;
declare const isTrue: (bool: unknown) => bool is true;

declare const isWeakSet: (set?: unknown) => set is WeakSet<object>;

declare const isWeakMap: (map: unknown) => map is WeakMap<object, unknown>;

type AsyncFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>;
declare const isGeneratorFunction: (func: unknown) => func is GeneratorFunction;
declare const isAsyncFunction: (func: unknown) => func is AsyncFunction;
declare const isNormalFunction: (func: unknown) => func is Function;
declare const isFunction: (func: unknown) => func is Function;

declare const isNullable: (val: unknown) => val is null | undefined;
declare const isUndef: (val: unknown) => val is undefined;
declare const isNull: (val: unknown) => val is null;

declare const debounce: (func: Function, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
}) => {
    (this: any, ...rest: any[]): any;
    cancel: () => void;
    flush: () => any;
};
declare const throttle: (func: Function, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}) => {
    (this: any, ...rest: any[]): any;
    cancel: () => void;
    flush: () => any;
};

declare const lowerCase: <T = any>(string: T) => T;
declare const upperCase: <T = any>(string: T) => T;
declare const camelCase: <T = any>(string: T, first?: boolean) => T;
declare const underCase: <T = any>(string: T, first?: boolean) => T;
declare const hyphenCase: <T = any>(string: T, first?: boolean) => T;

declare const _default: {
    unique: IUnique;
    untracked: <T = void>(fn: () => T) => T;
    computed: <T = void>(fn: () => T) => IReadonlySignal<T>;
    effect: <T = void>(fn: IEffectFn) => () => T;
    signal: INewSignal<any>;
    batch: <T = void>(fn: () => T) => T;
    lowerCase: <T = any>(string: T) => T;
    upperCase: <T = any>(string: T) => T;
    camelCase: <T = any>(string: T, first?: boolean) => T;
    underCase: <T = any>(string: T, first?: boolean) => T;
    hyphenCase: <T = any>(string: T, first?: boolean) => T;
    clone: <T = unknown>(val: T, opts?: ICloneOptions | IDeep) => T;
    equal: (one: unknown, two: unknown, opts?: IEqualOptions | IDeep) => boolean;
    merge: <T = unknown>(val: T, ...rest: any[]) => T;
    check: (one: unknown, two: unknown) => boolean;
    debounce: (func: Function, wait: number, options?: {
        leading?: boolean;
        trailing?: boolean;
        maxWait?: number;
    }) => {
        (this: any, ...rest: any[]): any;
        cancel: () => void;
        flush: () => any;
    };
    throttle: (func: Function, wait: number, options?: {
        leading?: boolean;
        trailing?: boolean;
    }) => {
        (this: any, ...rest: any[]): any;
        cancel: () => void;
        flush: () => any;
    };
    curry: Curry;
    isNullable: (val: unknown) => val is null | undefined;
    isUndef: (val: unknown) => val is undefined;
    isNull: (val: unknown) => val is null;
    isGeneratorFunction: (func: unknown) => func is GeneratorFunction;
    isNormalFunction: (func: unknown) => func is Function;
    isAsyncFunction: (func: unknown) => func is (...args: any[]) => Promise<any>;
    isFunction: (func: unknown) => func is Function;
    isWeakMap: (map: unknown) => map is WeakMap<object, unknown>;
    isWeakSet: (set?: unknown) => set is WeakSet<object>;
    isPromise: (val: unknown) => val is Promise<any>;
    toPromise: <T = unknown>(...rest: Array<unknown>) => Promise<T> & IPromiser;
    isBoolean: (bool: unknown) => bool is boolean;
    isFalse: (bool: unknown) => bool is false;
    isTrue: (bool: unknown) => bool is true;
    isNonEmptyString: (str: unknown) => str is string;
    isEmptyString: (str: unknown) => str is string;
    isString: (str: unknown) => str is string;
    isSymbol: (val: unknown) => val is symbol;
    toSymbol: (val?: unknown) => symbol;
    toSymbolFor: (val?: unknown) => symbol;
    isRegExp: (reg: unknown) => reg is RegExp;
    toRegExp: (reg: unknown, flags?: string) => RegExp;
    isNonEmptyObject: (obj: unknown) => obj is Record<string, unknown>;
    isEmptyObject: (obj: unknown) => obj is Record<string, unknown>;
    isObject: (obj: unknown) => obj is Record<string, unknown>;
    isNaN: (num: unknown) => num is number;
    isNumber: (num: unknown) => num is number;
    isFinite: (num: unknown) => num is number;
    isDecimal: (num: unknown) => num is number;
    isInteger: (num: unknown) => num is number;
    isInfinity: (num: unknown) => num is number;
    isSafeNumber: (num: unknown) => num is number;
    isSafeInteger: (num: unknown) => num is number;
    toSafeInteger: (num?: unknown, _?: never) => number;
    toSafeNumber: (num?: unknown, _?: never) => number;
    toInteger: (num?: unknown, _?: never) => number;
    toFinite: (num?: unknown, lie?: number) => number;
    toNumber: (num?: unknown, lie?: number) => number;
    toFixed: (num?: unknown, lie?: number) => string;
    isNonEmptyArray: (arr: unknown) => arr is any[];
    isEmptyArray: (arr: unknown) => arr is any[];
    isArray: (arr: unknown) => arr is any[];
    isReferenceError: (err: unknown) => err is ReferenceError;
    isSyntaxError: (err: unknown) => err is SyntaxError;
    isRangeError: (err: unknown) => err is RangeError;
    isEvalError: (err: unknown) => err is EvalError;
    isTypeError: (err: unknown) => err is TypeError;
    isURIError: (err: unknown) => err is URIError;
    isError: (err: unknown) => err is Error;
    isValidDate: (date: unknown) => date is Date;
    dateFormat: (date: unknown, format?: string) => string;
    isDate: (date: unknown) => date is Date;
    isNonEmptyMap: (map: unknown) => map is Map<unknown, unknown>;
    isEmptyMap: (map: unknown) => map is Map<unknown, unknown>;
    isMap: (map: unknown) => map is Map<unknown, unknown>;
    isNonEmptySet: (set: unknown) => set is Set<unknown>;
    isEmptySet: (set: unknown) => set is Set<unknown>;
    isSet: (set: unknown) => set is Set<unknown>;
};

export { type Curry, type CurryFn1, type CurryFn2, type CurryFn3, type CurryFn4, type CurryFn5, type ICloneOptions, type IDeep, type IEffectFn, type IEqualOptions, type IFilter, type INewSignal, type IPromiser, type IRandomize, type IRandomizeOptions, type IReadonlySignal, type IUnique, type IUniquerOptions, batch, camelCase, check, clone, computed, curry, dateFormat, debounce, _default as default, effect, equal, hyphenCase, isArray, isAsyncFunction, isBoolean, isDate, isDecimal, isEmptyArray, isEmptyMap, isEmptyObject, isEmptySet, isEmptyString, isError, isEvalError, isFalse, isFinite, isFunction, isGeneratorFunction, isInfinity, isInteger, isMap, isNaN, isNonEmptyArray, isNonEmptyMap, isNonEmptyObject, isNonEmptySet, isNonEmptyString, isNormalFunction, isNull, isNullable, isNumber, isObject, isPromise, isRangeError, isReferenceError, isRegExp, isSafeInteger, isSafeNumber, isSet, isString, isSymbol, isSyntaxError, isTrue, isTypeError, isURIError, isUndef, isValidDate, isWeakMap, isWeakSet, lowerCase, merge, signal, throttle, toFinite, toFixed, toInteger, toNumber, toPromise, toRegExp, toSafeInteger, toSafeNumber, toSymbol, toSymbolFor, underCase, unique, untracked, upperCase };
