const DEFAULT_REDACTED = '**********';

const coerce = {
  undefined: stringValue => (stringValue.trim() === 'undefined' ? undefined : stringValue),
  null: stringValue => (stringValue.trim() === 'null' ? null : stringValue),
};

/**
 * Run mixedValue through filters to ensure convert is always called with a string.
 * Any other type will immediately return null.
 *
 * If convert is not a function mixedValue is returned.
 */
const convertString = (mixedValue, convert, options = {}) => {
  const { coerceUndefined = true, coerceNull = true } = options;

  if (typeof mixedValue !== 'string') {
    return mixedValue === undefined ? undefined : null;
  }

  if (coerceUndefined === true && coerce.undefined(mixedValue) === undefined) {
    return undefined;
  }

  if (coerceNull === true && coerce.null(mixedValue) === null) {
    return null;
  }

  if (typeof convert !== 'function') {
    return mixedValue;
  }

  // mixedValue can only be string at this point.
  return convert(mixedValue);
};

const getKeyValue = key => process.env[key];

const redaction = () => DEFAULT_REDACTED;

const lowerTrim = stringValue => (typeof stringValue === 'string' ? stringValue.trim().toLowerCase() : '');

module.exports = {
  DEFAULT_REDACTED,
  coerce,
  convertString,
  lowerTrim,
  getKeyValue,
  redaction,
};
