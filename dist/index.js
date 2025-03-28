// library/-Set.ts
var isNonEmptySet = (set) => {
  return isSet(set) && set.size > 0;
};
var isEmptySet = (set) => {
  return isSet(set) && set.size === 0;
};
var isSet = (set) => {
  return Object.prototype.toString.call(set) === "[object Set]";
};
var Set_default = {
  isNonEmptySet,
  isEmptySet,
  isSet
};

// library/-Map.ts
var isNonEmptyMap = (map) => {
  return isMap(map) && map.size > 0;
};
var isEmptyMap = (map) => {
  return isMap(map) && map.size === 0;
};
var isMap = (map) => {
  return Object.prototype.toString.call(map) === "[object Map]";
};
var Map_default = {
  isNonEmptyMap,
  isEmptyMap,
  isMap
};

// library/-Number.ts
var isNaN = (num) => {
  return Number.isNaN(num);
};
var isNumber = (num) => {
  return Object.prototype.toString.call(num) === "[object Number]";
};
var isFinite = (num) => {
  return isNumber(num) && Number.isFinite(num);
};
var isDecimal = (num) => {
  return isFinite(num) && !Number.isInteger(num);
};
var isInteger = (num) => {
  return isFinite(num) && Number.isInteger(num);
};
var isInfinity = (num) => {
  return num === Infinity || num === -Infinity;
};
var isSafeNumber = (num) => {
  return isFinite(num) && num <= Number.MAX_SAFE_INTEGER && num >= Number.MIN_SAFE_INTEGER;
};
var isSafeInteger = (num) => {
  return isFinite(num) && Number.isSafeInteger(num);
};
var toSafeInteger = (num, _) => {
  if (+num >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  if (+num <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }
  if (isInteger(+num)) {
    return +num;
  }
  if (+num > 0) {
    return Math.floor(+num);
  }
  if (+num < 0) {
    return Math.ceil(+num);
  }
  return 0;
};
var toSafeNumber = (num, _) => {
  if (+num >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  if (+num <= Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }
  if (isFinite(+num)) {
    return +num;
  }
  return 0;
};
var toInteger = (num, _) => {
  if (isInteger(+num)) {
    return +num;
  }
  if (isFinite(+num)) {
    return +num > 0 ? Math.floor(+num) : Math.ceil(+num);
  }
  return 0;
};
var toFinite = (num, lie = NaN) => {
  if (isFinite(+num) && isInteger(+num)) {
    return +num;
  }
  if (isFinite(+num) && !isNaN(lie)) {
    return +toFixed(+num, lie);
  }
  if (isFinite(+num)) {
    return +num;
  }
  return 0;
};
var toNumber = (num, lie = NaN) => {
  if (isNumber(+num) && isInteger(+num)) {
    return +num;
  }
  if (isNumber(+num) && !isNaN(lie)) {
    return +toFixed(+num, lie);
  }
  if (isNumber(+num)) {
    return +num;
  }
  return 0;
};
var toFixed = (num, lie = NaN) => {
  if (+num === Infinity) {
    return "Infinity";
  }
  if (+num === -Infinity) {
    return "-Infinity";
  }
  num = +num;
  lie = lie >= 0 ? lie : NaN;
  lie = isSafeInteger(lie) ? lie : NaN;
  if (isFinite(num) && !isNaN(lie)) {
    const pow = Math.pow(10, lie);
    const data = Math.round(pow * num);
    const number = String(data / pow);
    if (isDecimal(+number)) {
      return number.split(".")[0] + "." + number.split(".")[1].padEnd(lie, "0");
    }
    if (isInteger(+number)) {
      return number + "." + "".padEnd(lie, "0");
    }
  }
  if (isFinite(num) && isNaN(lie)) {
    return num + "";
  }
  return "";
};
var Number_default = {
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
  toFixed
};

// library/~Nullable.ts
var isNullable = (val) => {
  return isUndef(val) || isNull(val);
};
var isUndef = (val) => {
  return Object.prototype.toString.call(val) === "[object Undefined]";
};
var isNull = (val) => {
  return Object.prototype.toString.call(val) === "[object Null]";
};
var Nullable_default = {
  isNullable,
  isUndef,
  isNull
};

// library/-String.ts
var isNonEmptyString = (str) => {
  return isString(str) && !!str.trim();
};
var isEmptyString = (str) => {
  return isString(str) && !str.trim();
};
var isString = (str) => {
  return Object.prototype.toString.call(str) === "[object String]";
};
var String_default = {
  isNonEmptyString,
  isEmptyString,
  isString
};

// library/-Date.ts
var isDate = (date) => {
  return Object.prototype.toString.call(date) === "[object Date]";
};
var isValidDate = (date) => {
  return isDate(date) && isFinite(+date);
};
var dateFormat = (date, format) => {
  date = isNullable(date) ? /* @__PURE__ */ new Date() : date;
  format = isNullable(format) ? "YYYY-MM-DD" : format;
  if (isNonEmptyString(format) && isValidDate(date)) {
    return format.replace(/YYYY|MM?|DD?|HH?|mm?|ss?s?|ii?i?/gi, (type) => {
      switch (type) {
        case "YYYY":
          return String(date.getFullYear());
        case "yyyy":
          return String(date.getFullYear());
        case "MM":
          return String(date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1));
        case "M":
          return String(date.getMonth() + 1);
        case "DD":
          return String(date.getDate() > 9 ? date.getDate() : "0" + date.getMonth());
        case "dd":
          return String(date.getDate() > 9 ? date.getDate() : "0" + date.getMonth());
        case "D":
          return String(date.getDate());
        case "d":
          return String(date.getDate());
        case "HH":
          return String(date.getHours() > 9 ? date.getHours() : "0" + date.getHours());
        case "hh":
          return String(date.getHours() > 9 ? date.getHours() : "0" + date.getHours());
        case "H":
          return String(date.getHours());
        case "h":
          return String(date.getHours());
        case "mm":
          return String(date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
        case "m":
          return String(date.getMinutes());
        case "ss":
          return String(date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds());
        case "s":
          return String(date.getSeconds());
        case "sss":
          return String(date.getMilliseconds() > 99 ? date.getMilliseconds() : date.getMilliseconds() > 9 ? "0" + date.getMilliseconds() : "00" + date.getMilliseconds());
        case "iii":
          return String(date.getMilliseconds() > 99 ? date.getMilliseconds() : date.getMilliseconds() > 9 ? "0" + date.getMilliseconds() : "00" + date.getMilliseconds());
        case "ii":
          return String(date.getMilliseconds() > 9 ? date.getMilliseconds() : "0" + date.getMilliseconds());
        case "i":
          return String(date.getMilliseconds());
      }
      return type;
    });
  }
  return "";
};
var Date_default = {
  isDate,
  isValidDate,
  dateFormat
};

// library/-Error.ts
var isReferenceError = (err) => {
  try {
    return err instanceof ReferenceError;
  } catch {
    return false;
  }
};
var isSyntaxError = (err) => {
  try {
    return err instanceof SyntaxError;
  } catch {
    return false;
  }
};
var isRangeError = (err) => {
  try {
    return err instanceof RangeError;
  } catch {
    return false;
  }
};
var isEvalError = (err) => {
  try {
    return err instanceof EvalError;
  } catch {
    return false;
  }
};
var isTypeError = (err) => {
  try {
    return err instanceof TypeError;
  } catch {
    return false;
  }
};
var isURIError = (err) => {
  try {
    return err instanceof URIError;
  } catch {
    return false;
  }
};
var isError = (err) => {
  try {
    return err instanceof Error;
  } catch {
    return false;
  }
};
var Error_default = {
  isReferenceError,
  isSyntaxError,
  isRangeError,
  isEvalError,
  isTypeError,
  isURIError,
  isError
};

// library/-Array.ts
var isNonEmptyArray = (arr) => {
  return isArray(arr) && arr.length > 0;
};
var isEmptyArray = (arr) => {
  return isArray(arr) && arr.length === 0;
};
var isArray = (arr) => {
  return Array.isArray(arr);
};
var Array_default = {
  isNonEmptyArray,
  isEmptyArray,
  isArray
};

// library/-Object.ts
var isNonEmptyObject = (obj) => {
  return isObject(obj) && Object.keys(obj).length > 0;
};
var isEmptyObject = (obj) => {
  return isObject(obj) && Object.keys(obj).length === 0;
};
var isObject = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};
var Object_default = {
  isNonEmptyObject,
  isEmptyObject,
  isObject
};

// library/-RegExp.ts
var isRegExp = (reg) => {
  return Object.prototype.toString.call(reg) === "[object RegExp]";
};
var toRegExp = (reg, flags) => {
  if (isRegExp(reg)) {
    return new RegExp(reg.source, flags ?? reg.flags);
  }
  if (isString(reg)) {
    return new RegExp(reg, flags);
  }
  return /(?:)/;
};
var RegExp_default = {
  isRegExp,
  toRegExp
};

// library/-Symbol.ts
var isSymbol = (val) => {
  return Object.prototype.toString.call(val) === "[object Symbol]";
};
var toSymbolFor = (val) => {
  if (isSymbol(val) && isString(Symbol.keyFor(val))) {
    return val;
  }
  if (isString(val) || isFinite(val)) {
    return Symbol.for(val + "");
  }
  return Symbol.for("undefined");
};
var toSymbol = (val) => {
  if (!isSymbol(val) && isString(val)) {
    return Symbol(val);
  }
  if (!isSymbol(val) && isFinite(val)) {
    return Symbol(val);
  }
  if (!isSymbol(val)) {
    return Symbol();
  }
  return val;
};
var Symbol_default = {
  isSymbol,
  toSymbol,
  toSymbolFor
};

// library/-Boolean.ts
var isBoolean = (bool) => {
  return bool === true || bool === false;
};
var isFalse = (bool) => {
  return bool === false;
};
var isTrue = (bool) => {
  return bool === true;
};
var Boolean_default = {
  isBoolean,
  isFalse,
  isTrue
};

// library/-Promise.ts
var toPromise = (...rest) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  const promiser = Promise.race([...rest, promise]);
  return Object.assign(promiser, {
    promise: promiser,
    resolve,
    reject
  });
};
var isPromise = (val) => {
  return Object.prototype.toString.call(val) === "[object Promise]";
};
var Promise_default = {
  isPromise,
  toPromise
};

// library/-WeakSet.ts
var isWeakSet = (set) => {
  return Object.prototype.toString.call(set) === "[object WeakSet]";
};
var WeakSet_default = {
  isWeakSet
};

// library/-WeakMap.ts
var isWeakMap = (map) => {
  return Object.prototype.toString.call(map) === "[object WeakMap]";
};
var WeakMap_default = {
  isWeakMap
};

// library/-Function.ts
var isGeneratorFunction = (func) => {
  return Object.prototype.toString.call(func) === "[object GeneratorFunction]";
};
var isAsyncFunction = (func) => {
  return Object.prototype.toString.call(func) === "[object AsyncFunction]";
};
var isNormalFunction = (func) => {
  return Object.prototype.toString.call(func) === "[object Function]";
};
var isFunction = (func) => {
  return isNormalFunction(func) || isAsyncFunction(func) || isGeneratorFunction(func);
};
var Function_default = {
  isGeneratorFunction,
  isNormalFunction,
  isAsyncFunction,
  isFunction
};

// library/~Currylize.ts
var curry = function(fn, length) {
  if (!isFunction(fn)) {
    throw new TypeError("#<fn> is not a function");
  }
  const currying = (fn2, length2, holder, params, holders) => {
    const wrapper = (...rest) => {
      const _params = params.slice();
      const _holders = holders.slice();
      rest.forEach((arg) => {
        if (!holders.length && arg === holder) {
          _params.push(arg);
          _holders.push(_params.length - 1);
          return;
        }
        if (!holders.length && arg !== holder) {
          _params.push(arg);
          return;
        }
        if (holders.length && arg !== holder) {
          const index = holders.shift();
          _holders.splice(_holders.indexOf(index), 1);
          _params[index] = arg;
          return;
        }
        holders.shift();
      });
      const isPass = _params.length >= length2 && _params.slice(0, length2).every((v) => v !== holder);
      return !isPass ? currying(fn2, length2, holder, _params, _holders) : fn2.apply(this, _params);
    };
    return wrapper;
  };
  return currying(fn, isSafeInteger(length) && length >= 0 ? length : fn.length, curry, [], []);
};
var Currylize_default = {
  curry
};

// library/~Animater.ts
var debounce = (func, wait, options = {}) => {
  let result;
  let timerId;
  let lastArgs;
  let lastThis;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  if (!isFunction(func)) {
    throw new TypeError("#<func> is not a function");
  }
  if (!isObject(options)) {
    options = {};
  }
  wait = Math.max(toFinite(wait), 0);
  const leading = options.leading === true;
  const trailing = options.trailing !== false;
  const useFrame = wait < 20 && typeof window.requestAnimationFrame === "function";
  const maxWait = isFinite(options.maxWait) && Math.max(options.maxWait, wait);
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    if (useFrame) timerId = window.requestAnimationFrame(timerExpired);
    if (!useFrame) timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const remainingCallTime = Math.max(wait - timeSinceLastCall, 0);
    const remainingInvokeTime = Math.max(+maxWait - timeSinceLastInvoke, 0);
    return maxWait === false ? remainingCallTime : Math.min(remainingCallTime, remainingInvokeTime);
  }
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === 0 || timeSinceLastCall < 0 || timeSinceLastCall >= wait || maxWait !== false && timeSinceLastInvoke >= maxWait;
  }
  function leadingEdge(time) {
    if (leading) {
      return invokeFunc(time);
    }
    lastInvokeTime = time;
    if (useFrame) timerId = window.requestAnimationFrame(timerExpired);
    if (!useFrame) timerId = setTimeout(timerExpired, wait);
    return result;
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function invokeFunc(time) {
    const args = lastArgs;
    const context = lastThis;
    lastInvokeTime = time;
    lastArgs = lastThis = void 0;
    result = func.apply(context, args);
    return result;
  }
  function cancel() {
    if (!isNullable(timerId)) {
      if (useFrame) window.cancelAnimationFrame(timerId);
      if (!useFrame) clearTimeout(timerId);
    }
    lastArgs = lastThis = timerId = void 0;
    lastCallTime = lastInvokeTime = 0;
  }
  function flush() {
    return isNullable(timerId) ? result : trailingEdge(Date.now());
  }
  function debounced(...rest) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastThis = this;
    lastArgs = rest;
    lastCallTime = time;
    if (isInvoking && isNullable(timerId)) {
      return leadingEdge(lastCallTime);
    }
    if (isInvoking && maxWait !== false) {
      if (!useFrame) clearTimeout(timerId);
      if (useFrame) window.cancelAnimationFrame(timerId);
      if (useFrame) timerId = window.requestAnimationFrame(timerExpired);
      if (!useFrame) timerId = setTimeout(timerExpired, remainingWait(time));
      return invokeFunc(lastCallTime);
    }
    if (isNullable(timerId)) {
      if (useFrame) timerId = window.requestAnimationFrame(timerExpired);
      if (!useFrame) timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};
var throttle = (func, wait, options = {}) => {
  const leading = !isObject(options) || options.leading !== false;
  const trailing = !isObject(options) || options.trailing !== false;
  if (!isFunction(func)) {
    throw new TypeError("#<func> is not a function");
  }
  return debounce(func, wait, {
    maxWait: wait,
    leading,
    trailing
  });
};
var Animater_default = {
  debounce,
  throttle
};

// library/~Operater.ts
var equal = (one, two, opts = true) => {
  if (one === two) {
    return true;
  }
  if (Object.is(one, two)) {
    return true;
  }
  if (isSet(one) && isSet(two)) {
    return one.size === two.size && equal([...one.values()], [...two.values()], opts);
  }
  if (isMap(one) && isMap(two)) {
    return one.size === two.size && equal(Object.fromEntries(one.entries()), Object.fromEntries(two.entries()), opts);
  }
  if (isNumber(one) && isNumber(two)) {
    return Math.abs(one - two) < Number.EPSILON;
  }
  const deep = isObject(opts) ? opts.deep : opts;
  const level = isNullable(deep) || deep === true || deep === Infinity ? Infinity : toInteger(deep);
  const include = isObject(opts) && isArray(opts.include) ? opts.include.filter((key) => isRegExp(key) || isFinite(key) || isString(key)) : [/(?:)/];
  const exclude = isObject(opts) && isArray(opts.exclude) ? opts.exclude.filter((key) => isRegExp(key) || isFinite(key) || isString(key)) : [];
  const strict = isObject(opts) && isArray(opts.strict) ? opts.strict.filter((key) => isRegExp(key) || isFinite(key) || isString(key)) : [];
  if (!isNumber(level) || level < 1) {
    return false;
  }
  if (isRegExp(one) && isRegExp(two)) {
    return one.source === two.source && one.flags === two.flags && one.lastIndex === two.lastIndex;
  }
  if (isObject(one) && isObject(two)) {
    const oneKeys = Object.keys(one).filter((key) => {
      const excluded = exclude.length > 0 && exclude.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const included = include.length === 0 || include.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      return !excluded && included;
    });
    const twoKeys = Object.keys(two).filter((key) => {
      const excluded = exclude.length > 0 && exclude.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const included = include.length === 0 || include.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      return !excluded && included;
    });
    if (oneKeys.length !== twoKeys.length) {
      return false;
    }
    for (const key of Object.keys(one)) {
      const val1 = one[key];
      const val2 = two[key];
      const deep2 = level - 1;
      const stricted = strict.length > 0 && strict.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const excluded = exclude.length > 0 && exclude.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const included = include.length === 0 || include.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      if (excluded || !included) {
        continue;
      }
      if (val1 === val2) {
        continue;
      }
      if (stricted) {
        return false;
      }
      if (deep2 < 1) {
        return false;
      }
      const reuslt = equal(val1, val2, {
        strict,
        include,
        exclude,
        deep: deep2
      });
      if (!reuslt) {
        return false;
      }
    }
    return true;
  }
  if (isArray(one) && isArray(two)) {
    const oneKeys = Object.keys(one).filter((key) => {
      const excluded = exclude.length > 0 && exclude.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const included = include.length === 0 || include.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      return !excluded && included;
    });
    const twoKeys = Object.keys(two).filter((key) => {
      const excluded = exclude.length > 0 && exclude.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const included = include.length === 0 || include.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      return !excluded && included;
    });
    if (oneKeys.length !== twoKeys.length) {
      return false;
    }
    for (const key of one.keys()) {
      const val1 = one[key];
      const val2 = two[key];
      const deep2 = level - 1;
      const stricted = strict.length > 0 && strict.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const excluded = exclude.length > 0 && exclude.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      const included = include.length === 0 || include.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key));
      if (excluded || !included) {
        continue;
      }
      if (val1 === val2) {
        continue;
      }
      if (stricted) {
        return false;
      }
      if (deep2 < 1) {
        return false;
      }
      const reuslt = equal(val1, val2, {
        strict,
        include,
        exclude,
        deep: deep2
      });
      if (!reuslt) {
        return false;
      }
    }
    return true;
  }
  if (isDate(one) && isDate(two)) {
    return +one === +two;
  }
  return false;
};
var clone = (val, opts = true) => {
  const deep = isObject(opts) ? opts.deep : opts;
  const cache = isObject(opts) && isWeakMap(opts.cache) ? opts.cache : /* @__PURE__ */ new WeakMap();
  const level = isNullable(deep) || deep === true || deep === Infinity ? Infinity : Math.max(toInteger(deep), 1);
  const omit = isObject(opts) && isArray(opts.omit) ? opts.omit.filter((key) => isRegExp(key) || isString(key) || isFinite(key)) : [];
  const pick = isObject(opts) && isArray(opts.pick) ? opts.pick.filter((key) => isRegExp(key) || isString(key) || isFinite(key)) : [];
  const cloning = (val2, level2) => {
    const value = isArray(val2) ? [] : {};
    for (const [key, source] of taking(val2)) {
      if (pick.length > 0 && !pick.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))) {
        continue;
      }
      if (omit.length > 0 && omit.some((k) => isRegExp(k) ? k.test(String(key)) : String(k) === String(key))) {
        continue;
      }
      let record = source;
      const isCopySet = isSet(source);
      const isCopyMap = isMap(source);
      const isCopyDate = isDate(source);
      const isCopyArray = isArray(source);
      const isCopyObject = isObject(source);
      const isCopyRegExp = isRegExp(source);
      if (!isCopySet && !isCopyMap && !isCopyDate && !isCopyArray && !isCopyObject && !isCopyRegExp) {
        if (isArray(value)) value.push(record);
        if (!isArray(value)) value[key] = record;
        continue;
      }
      if (level2 > 1 && !cache.has(source)) {
        cache.set(source, clone(source, { omit, pick, cache, deep: level2 - 1 }));
      }
      if (level2 > 1 && cache.has(source)) {
        record = cache.get(source);
      }
      if (isArray(value)) value.push(record);
      if (!isArray(value)) value[key] = record;
    }
    return value;
  };
  const taking = (val2) => {
    return isObject(val2) ? Object.entries(val2) : val2.entries();
  };
  if (!isNumber(level) || level < 1) {
    return val;
  }
  if (isRegExp(val)) {
    const flags = val.flags;
    const source = val.source;
    const regexp = new RegExp(source, flags);
    regexp.lastIndex = val.lastIndex;
    return regexp;
  }
  if (isObject(val)) {
    return cloning(val, level);
  }
  if (isArray(val)) {
    return cloning(val, level);
  }
  if (isDate(val)) {
    return /* @__PURE__ */ new Date(+val);
  }
  if (isMap(val)) {
    const maps = Array.from(val.entries());
    return new Map(cloning(maps, level));
  }
  if (isSet(val)) {
    const sets = Array.from(val.values());
    return new Set(cloning(sets, level));
  }
  return val;
};
var merge = (val, ...rest) => {
  const empty = {};
  const cache = /* @__PURE__ */ new WeakMap();
  const state = rest.slice(-1)[0];
  const level = isNumber(state) && state !== Infinity ? Math.max(toInteger(state), 1) : state !== false ? Infinity : 1;
  const taking = (val2) => {
    return isObject(val2) ? Object.entries(val2) : val2.entries();
  };
  const merging = (val2, obj, level2) => {
    const refly = isMap(val2) ? Object.fromEntries(val2.entries()) : isSet(val2) ? Array.from(val2.values()) : val2;
    const newly = isMap(obj) ? Object.fromEntries(obj.entries()) : isSet(obj) ? Array.from(obj.values()) : obj;
    for (const [key, source] of taking(newly)) {
      if (level2 < 1) {
        refly[key] = source;
        continue;
      }
      const isCopySet = isSet(source);
      const isCopyMap = isMap(source);
      const isCopyDate = isDate(source);
      const isCopyArray = isArray(source);
      const isCopyObject = isObject(source);
      const isCopyRegExp = isRegExp(source);
      const isNotSameType = empty.toString.call(refly[key]) !== empty.toString.call(source);
      if (!isCopySet && !isCopyMap && !isCopyDate && !isCopyArray && !isCopyObject && !isCopyRegExp) {
        refly[key] = source;
        continue;
      }
      if (!cache.has(source)) {
        cache.set(source, clone(source, { deep: level2, cache }));
      }
      if (isNotSameType) {
        refly[key] = cache.get(source);
        continue;
      }
      merging(refly[key], newly[key], level2 - 1);
    }
    if (isMap(val2) || isSet(val2)) {
      val2.clear();
    }
    if (isMap(val2)) {
      for (const [key, source] of Object.entries(refly)) {
        val2.set(key, source);
      }
    }
    if (isSet(val2)) {
      for (const source of refly) {
        val2.add(source);
      }
    }
  };
  if (isObject(val) || isArray(val) || isMap(val) || isSet(val)) {
    for (const obj of rest) {
      if (empty.toString.call(val) !== empty.toString.call(obj)) {
        continue;
      }
      merging(val, obj, level - 1);
    }
  }
  return val;
};
var Operater_default = {
  clone,
  equal,
  merge
};

// library/~Formater.ts
var lowerCase = (string) => {
  return isNonEmptyString(string) ? string.replace(/[A-Z]/g, (t1) => t1 && t1.toLowerCase()) : string;
};
var upperCase = (string) => {
  return isNonEmptyString(string) ? string.replace(/[a-z]/g, (t1) => t1 && t1.toUpperCase()) : string;
};
var camelCase = (string, first = false) => {
  return first === true ? isNonEmptyString(string) ? string.replace(/(^|[_-])([a-z])/g, (_t1, _t2, t3) => t3 && t3.toUpperCase()) : string : isNonEmptyString(string) ? string.replace(/[_-]([a-z])/g, (_t1, t2) => t2 && t2.toUpperCase()) : string;
};
var underCase = (string, first = false) => {
  return first === true ? isNonEmptyString(string) ? string.replace(/([A-Z])/g, "_$1").replace(/([_-])([a-zA-Z])/g, "_$2").toLowerCase().replace(/^[_-]+/, "") : string : isNonEmptyString(string) ? string.replace(/([A-Z])/g, "_$1").replace(/([_-])([a-zA-Z])/g, "_$2").toLowerCase() : string;
};
var hyphenCase = (string, first = false) => {
  return first === true ? isNonEmptyString(string) ? string.replace(/([A-Z])/g, "-$1").replace(/([_-])([a-zA-Z])/g, "-$2").toLowerCase().replace(/^[_-]+/, "") : string : isNonEmptyString(string) ? string.replace(/([A-Z])/g, "-$1").replace(/([_-])([a-zA-Z])/g, "-$2").toLowerCase() : string;
};
var Formater_default = {
  lowerCase,
  upperCase,
  camelCase,
  underCase,
  hyphenCase
};

// library/~Signaler.ts
var RUNNING = 1 << 0;
var NOTIFIED = 1 << 1;
var OUTDATED = 1 << 2;
var DISPOSED = 1 << 3;
var ERRORING = 1 << 4;
var TRACKING = 1 << 5;
var THRESHOLD = 1 << 7;
var batchDepth = 0;
var batchIterate = 0;
var globalVersion = 0;
var globalEffect = void 0;
var evalContext = void 0;
var Util = class _Util {
  static isNeedRecompute(target) {
    for (let node = target.source; node !== void 0; node = node.nextSource) {
      if (node.signal.version !== node.version || !node.signal.refresh() || node.signal.version !== node.version) {
        return true;
      }
    }
    return false;
  }
  static prepareSources(target) {
    for (let node = target.source; node !== void 0; node = node.nextSource) {
      if (node.signal.node !== void 0) {
        node.rollbackNode = node.signal.node;
      }
      node.version = -1;
      node.signal.node = node;
      if (node.nextSource === void 0) {
        target.source = node;
        break;
      }
    }
  }
  static cleanSources(target) {
    let node = target.source;
    let head = void 0;
    while (node !== void 0) {
      const prev = node.prevSource;
      if (node.version === -1) {
        node.signal.delNode(node);
        if (prev !== void 0) {
          prev.nextSource = node.nextSource;
        }
        if (node.nextSource !== void 0) {
          node.nextSource.prevSource = prev;
        }
      } else {
        head = node;
      }
      node.signal.node = node.rollbackNode;
      if (node.rollbackNode !== void 0) {
        node.rollbackNode = void 0;
      }
      node = prev;
    }
    target.source = head;
  }
  static startBatch() {
    batchDepth++;
  }
  static endBatch() {
    if (batchDepth > 1) {
      batchDepth--;
      return;
    }
    let error;
    let hasError = false;
    while (globalEffect !== void 0) {
      let effect2 = globalEffect;
      globalEffect = void 0;
      batchIterate++;
      while (effect2 !== void 0) {
        const next = effect2.nextEffect;
        effect2.nextEffect = void 0;
        effect2.flags &= ~NOTIFIED;
        if (!(effect2.flags & DISPOSED) && _Util.isNeedRecompute(effect2)) {
          try {
            effect2.callback();
          } catch (err) {
            if (!hasError) {
              hasError = true;
              error = err;
            }
          }
        }
        effect2 = next;
      }
    }
    batchIterate = 0;
    batchDepth--;
    if (hasError) {
      throw error;
    }
  }
};
var Effect = class {
  fn;
  nextEffect;
  cleanup = void 0;
  source = void 0;
  flags = TRACKING;
  constructor(fn) {
    this.fn = fn;
  }
  callback() {
    const finish = this.start();
    try {
      if (this.flags & DISPOSED) return;
      if (this.fn === void 0) return;
      const cleanup = this.fn();
      if (typeof cleanup === "function") {
        this.cleanup = cleanup;
      }
    } finally {
      finish();
    }
  }
  dispose() {
    this.flags |= DISPOSED;
    if (!(this.flags & RUNNING)) {
      for (let node = this.source; node !== void 0; node = node.nextSource) {
        node.signal.delNode(node);
      }
      this.source = void 0;
      this.fn = void 0;
      this.clean();
    }
  }
  notify() {
    if (!(this.flags & NOTIFIED)) {
      this.nextEffect = globalEffect;
      this.flags |= NOTIFIED;
      globalEffect = this;
    }
  }
  clean() {
    const cleanup = this.cleanup;
    this.cleanup = void 0;
    if (typeof cleanup === "function") {
      Util.startBatch();
      const ctx = evalContext;
      evalContext = void 0;
      try {
        cleanup();
      } catch (err) {
        this.flags &= ~RUNNING;
        this.flags |= DISPOSED;
        this.dispose();
        throw err;
      } finally {
        evalContext = ctx;
        Util.endBatch();
      }
    }
  }
  start() {
    if (this.flags & RUNNING) {
      throw new Error("Cycle detected");
    }
    this.flags |= RUNNING;
    this.flags &= ~DISPOSED;
    this.clean();
    Util.prepareSources(this);
    Util.startBatch();
    const ctx = evalContext;
    const end = (ctx2) => {
      if (evalContext !== this) {
        throw new Error("Out-of-order effect");
      }
      Util.cleanSources(this);
      evalContext = ctx2;
      this.flags &= ~RUNNING;
      if (this.flags & DISPOSED) {
        this.dispose();
      }
      Util.endBatch();
    };
    const finish = end.bind(this, ctx);
    evalContext = this;
    return finish;
  }
};
var Signal = class {
  val;
  err;
  node = void 0;
  target = void 0;
  version = 0;
  get value() {
    const node = this.dependency();
    if (node !== void 0) {
      node.version = this.version;
    }
    return this.val;
  }
  set value(val) {
    if (val === this.val) {
      return;
    }
    if (batchIterate > THRESHOLD) {
      throw new Error("Cycle detected");
    }
    globalVersion++;
    this.version++;
    this.val = val;
    try {
      Util.startBatch();
      for (let node = this.target; node !== void 0; node = node.nextTarget) {
        node.target.notify();
      }
    } finally {
      Util.endBatch();
    }
  }
  constructor(val) {
    this.val = val;
  }
  addNode(node) {
    if (this.target !== node && node.prevTarget === void 0) {
      node.nextTarget = this.target;
      if (this.target !== void 0) {
        this.target.prevTarget = node;
      }
      this.target = node;
    }
  }
  delNode(node) {
    if (this.target !== void 0) {
      const prev = node.prevTarget;
      const next = node.nextTarget;
      if (prev !== void 0) {
        prev.nextTarget = next;
        node.prevTarget = void 0;
      }
      if (next !== void 0) {
        next.prevTarget = prev;
        node.nextTarget = void 0;
      }
      if (node === this.target) {
        this.target = next;
      }
    }
  }
  subscribe(fn) {
    return effect(() => {
      const value = this.value;
      const ctx = evalContext;
      evalContext = void 0;
      try {
        fn(value);
      } finally {
        evalContext = ctx;
      }
    });
  }
  dependency() {
    if (evalContext === void 0) {
      return void 0;
    }
    let node = this.node;
    if (node === void 0 || node.target !== evalContext) {
      node = {
        version: 0,
        signal: this,
        target: evalContext,
        prevSource: evalContext.source,
        nextSource: void 0,
        prevTarget: void 0,
        nextTarget: void 0,
        rollbackNode: node
      };
      if (evalContext.source !== void 0) {
        evalContext.source.nextSource = node;
      }
      evalContext.source = node;
      this.node = node;
      if (evalContext.flags & TRACKING) {
        this.addNode(node);
      }
      return node;
    }
    if (node.version === -1) {
      node.version = 0;
      if (node.nextSource !== void 0) {
        node.nextSource.prevSource = node.prevSource;
        if (node.prevSource !== void 0) {
          node.prevSource.nextSource = node.nextSource;
        }
        node.prevSource = evalContext.source;
        node.nextSource = void 0;
        evalContext.source.nextSource = node;
        evalContext.source = node;
      }
      return node;
    }
    return void 0;
  }
  refresh() {
    return true;
  }
  toString() {
    return this.value + "";
  }
  valueOf() {
    return this.value;
  }
  toJSON() {
    return this.value;
  }
  peek() {
    const ctx = evalContext;
    evalContext = void 0;
    try {
      return this.value;
    } finally {
      evalContext = ctx;
    }
  }
};
var Computed = class extends Signal {
  globalVersion = globalVersion - 1;
  source = void 0;
  flags = OUTDATED;
  fn;
  get value() {
    if (this.flags & RUNNING) {
      throw new Error("Cycle detected");
    }
    const node = this.dependency();
    this.refresh();
    if (node !== void 0) {
      node.version = this.version;
    }
    if (this.flags & ERRORING) {
      throw this.err;
    }
    return this.val;
  }
  constructor(fn) {
    super(void 0);
    this.fn = fn;
  }
  addNode(node) {
    if (this.target === void 0) {
      this.flags |= OUTDATED | TRACKING;
      for (let node2 = this.source; node2 !== void 0; node2 = node2.nextSource) {
        node2.signal.addNode(node2);
      }
    }
    super.addNode(node);
  }
  delNode(node) {
    if (this.target !== void 0) {
      super.delNode(node);
      if (this.target === void 0) {
        this.flags &= ~TRACKING;
        for (let node2 = this.source; node2 !== void 0; node2 = node2.nextSource) {
          node2.signal.delNode(node2);
        }
      }
    }
  }
  refresh() {
    this.flags &= ~NOTIFIED;
    if (this.flags & RUNNING) {
      return false;
    }
    if ((this.flags & (OUTDATED | TRACKING)) === TRACKING) {
      return true;
    }
    this.flags &= ~OUTDATED;
    if (this.globalVersion === globalVersion) {
      return true;
    }
    this.globalVersion = globalVersion;
    this.flags |= RUNNING;
    if (this.version > 0 && !Util.isNeedRecompute(this)) {
      this.flags &= ~RUNNING;
      return true;
    }
    const selfContext = this;
    const prevContext = evalContext;
    try {
      Util.prepareSources(this);
      evalContext = selfContext;
      const value = this.fn();
      if (this.flags & ERRORING || this.val !== value || this.version === 0) {
        this.version = this.version + 1;
        this.flags &= ~ERRORING;
        this.err = void 0;
        this.val = value;
      }
    } catch (err) {
      this.version = this.version + 1;
      this.flags |= ERRORING;
      this.err = err;
    }
    evalContext = prevContext;
    Util.cleanSources(this);
    this.flags &= ~RUNNING;
    return true;
  }
  notify() {
    if (!(this.flags & NOTIFIED)) {
      this.flags |= OUTDATED | NOTIFIED;
      for (let node = this.target; node !== void 0; node = node.nextTarget) {
        node.target.notify();
      }
    }
  }
};
var untracked = (fn) => {
  const ctx = evalContext;
  evalContext = void 0;
  try {
    return fn();
  } finally {
    evalContext = ctx;
  }
};
var computed = (fn) => {
  return new Computed(fn);
};
var effect = (fn) => {
  const effect2 = new Effect(fn);
  try {
    effect2.callback();
  } catch (err) {
    effect2.dispose();
    throw err;
  }
  return effect2.dispose.bind(effect2);
};
var signal = (val) => {
  return new Signal(val);
};
var batch = (fn) => {
  if (batchDepth > 0) {
    return fn();
  }
  Util.startBatch();
  try {
    return fn();
  } finally {
    Util.endBatch();
  }
};
var Signaler_default = {
  untracked,
  computed,
  effect,
  signal,
  batch
};

// library/~Uniquer.ts
var Cacher = /* @__PURE__ */ new Set([""]);
var unique = (options = {}) => {
  const radix = options.radix !== void 0 ? options.radix : 16;
  const random = options.random !== void 0 ? options.random : "?";
  const format = options.format !== void 0 ? options.format : "????????-????-[1-5]???-[8-b]???-????????????".replace(/\?/g, random);
  const uniques = options.uniques !== void 0 ? options.uniques : null;
  if (![2, 8, 10, 16, 26, 36].includes(radix)) {
    throw new Error("#<Options.radix> is not in [2, 8, 10, 16, 26, 36]");
  }
  if (!["?", "*", "#"].includes(random)) {
    throw new Error('#<Options.random> is not in ["?", "*", "#"]');
  }
  if (String(format) !== format) {
    throw new Error("#<Options.format> is not string");
  }
  if (uniques instanceof Array) {
    uniques.forEach((key) => typeof key === "string" && Cacher.add(key));
  }
  if (uniques instanceof Set) {
    uniques.forEach((key) => typeof key === "string" && Cacher.add(key));
  }
  let uuid = "";
  let tryCount = 10;
  let regenerate = true;
  const byteOffset = radix === 26 ? 10 : 0;
  const characters = Array.from({ length: 36 }, (_, key) => key.toString(36));
  const appendCacher = Cacher.add.bind(Cacher);
  const randomizer = (opt) => {
    const min = opt.min;
    const max = opt.max;
    const bytes = opt.bytes;
    return bytes[Math.random() * (max - min + 1) + min | 0];
  };
  while (regenerate && tryCount-- > 0) {
    const template = format.replace(/\[([^\]]+?)\]/g, (_, group) => {
      const caches = /* @__PURE__ */ new Set();
      const append = caches.add.bind(caches);
      const splits = group.toLowerCase().split(/\s*,\s*/g);
      const filters = splits.filter((str) => /^[a-zA-Z0-9\s/|\-*?#=:;]+$/ui.test(str));
      const isRange = (str) => /^\s*[a-zA-Z0-9]\s*-\s*[a-zA-Z0-9]\s*$/.test(str);
      const collects = filters.reduce((caches2, string) => {
        if (isRange(string.trim())) {
          const str1 = string.trim().split(/\s*-\s*/)[0];
          const str2 = string.trim().split(/\s*-\s*/)[1];
          const key1 = characters.indexOf(str1.trim());
          const key2 = characters.indexOf(str2.trim());
          const first = Math.min(key1, key2);
          const second = Math.max(key1, key2) + 1;
          characters.slice(first, second).forEach(append);
        }
        if (!isRange(string.trim())) {
          append(string.trim());
        }
        return caches2;
      }, caches);
      const temp = Array.from(collects);
      const bytes2 = temp.filter((every) => !!every);
      return randomizer({
        bytes: bytes2,
        max: bytes2.length - 1,
        min: 0
      });
    });
    const min = 0;
    const max = radix - 1;
    const bytes = characters.slice(byteOffset);
    uuid = [...template.toLowerCase()].filter((str) => /^[a-zA-Z0-9\s/|\-*?#=:;]+$/ui.test(str)).map((v) => v === random ? randomizer({ bytes, max, min }) : v).join("").trim();
    if (!Cacher.has(uuid)) {
      regenerate = false;
      appendCacher(uuid);
    }
  }
  if (regenerate) {
    throw new Error("[Uniquer generate uuid] is Reduplicated");
  }
  return uuid;
};
var Uniquer_default = {
  unique
};

// library/index.ts
var library_default = {
  ...Set_default,
  ...Map_default,
  ...Date_default,
  ...Error_default,
  ...Array_default,
  ...Number_default,
  ...Object_default,
  ...RegExp_default,
  ...Symbol_default,
  ...String_default,
  ...Boolean_default,
  ...Promise_default,
  ...WeakSet_default,
  ...WeakMap_default,
  ...Function_default,
  ...Nullable_default,
  ...Currylize_default,
  ...Animater_default,
  ...Operater_default,
  ...Formater_default,
  ...Signaler_default,
  ...Uniquer_default
};
export {
  batch,
  camelCase,
  clone,
  computed,
  curry,
  dateFormat,
  debounce,
  library_default as default,
  effect,
  equal,
  hyphenCase,
  isArray,
  isAsyncFunction,
  isBoolean,
  isDate,
  isDecimal,
  isEmptyArray,
  isEmptyMap,
  isEmptyObject,
  isEmptySet,
  isEmptyString,
  isError,
  isEvalError,
  isFalse,
  isFinite,
  isFunction,
  isGeneratorFunction,
  isInfinity,
  isInteger,
  isMap,
  isNaN,
  isNonEmptyArray,
  isNonEmptyMap,
  isNonEmptyObject,
  isNonEmptySet,
  isNonEmptyString,
  isNormalFunction,
  isNull,
  isNullable,
  isNumber,
  isObject,
  isPromise,
  isRangeError,
  isReferenceError,
  isRegExp,
  isSafeInteger,
  isSafeNumber,
  isSet,
  isString,
  isSymbol,
  isSyntaxError,
  isTrue,
  isTypeError,
  isURIError,
  isUndef,
  isValidDate,
  isWeakMap,
  isWeakSet,
  lowerCase,
  merge,
  signal,
  throttle,
  toFinite,
  toFixed,
  toInteger,
  toNumber,
  toPromise,
  toRegExp,
  toSafeInteger,
  toSafeNumber,
  toSymbol,
  toSymbolFor,
  underCase,
  unique,
  untracked,
  upperCase
};
