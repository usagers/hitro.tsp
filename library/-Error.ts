export const isReferenceError = (err: unknown): err is ReferenceError => {
  try { return err instanceof ReferenceError } catch { return false }
}

export const isSyntaxError = (err: unknown): err is SyntaxError => {
  try { return err instanceof SyntaxError } catch { return false }
}

export const isRangeError = (err: unknown): err is RangeError => {
  try { return err instanceof RangeError } catch { return false }
}

export const isEvalError = (err: unknown): err is EvalError => {
  try { return err instanceof EvalError } catch { return false }
}

export const isTypeError = (err: unknown): err is TypeError => {
  try { return err instanceof TypeError } catch { return false }
}

export const isURIError = (err: unknown): err is URIError => {
  try { return err instanceof URIError } catch { return false }
}

export const isError = (err: unknown): err is Error => {
  try { return err instanceof Error } catch { return false }
}

export default {
  isReferenceError,
  isSyntaxError,
  isRangeError,
  isEvalError,
  isTypeError,
  isURIError,
  isError,
}
