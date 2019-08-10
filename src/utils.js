const DEFAULT_REDACTED = '**********';

const coerce = {
  undefined: stringValue => (stringValue.trim() === 'undefined' ? undefined : stringValue),
  null: stringValue => (stringValue.trim() === 'null' ? null : stringValue),
};

/**
 * Will only accept stringValue as string type or undefined.
 * Any other type will immediately return null.
 *
 * Cast must be type function or stringValue is immediately returned.
 */
const cast = (stringValue, caster, options = {}) => {
  const { coerceUndefined = true, coerceNull = true } = options;

  if (typeof stringValue !== 'string') {
    return stringValue === undefined ? undefined : null;
  }

  if (typeof caster !== 'function') {
    return stringValue;
  }

  if (coerceUndefined === true && coerce.undefined(stringValue) === undefined) {
    return undefined;
  }

  if (coerceNull === true && coerce.null(stringValue) === null) {
    return null;
  }

  return caster(stringValue);
};

const getEnv = key => process.env[key];

const redaction = () => DEFAULT_REDACTED;

module.exports = {
  DEFAULT_REDACTED,
  coerce,
  cast,
  getEnv,
  redaction,
};
