const DEFAULT_REDACTED = '**********';

const redaction = () => DEFAULT_REDACTED;

const getKeyValue = key => process.env[key];

const lowerTrim = stringValue => (typeof stringValue === 'string' ? stringValue.trim().toLowerCase() : '');

const coerceUndefinedString = stringValue => lowerTrim(stringValue) === 'undefined';

const coerceNullString = stringValue => lowerTrim(stringValue) === 'null';

/**
 * Will only call cast() with string value.
 * Any other types will be filtered and returned as undefined or null.
 * Any exceptions encoutered during casting will return null.
 *
 * @param {*} mixedValue
 * @param {function} cast
 * @param {object} options
 */
const castString = (mixedValue, cast, options = {}) => {
  try {
    const { coerceUndefined = true, coerceNull = true } = options;

    if (typeof mixedValue !== 'string') {
      return mixedValue === undefined ? undefined : null;
    }

    if (coerceUndefined === true && coerceUndefinedString(mixedValue) === true) {
      return undefined;
    }

    if (coerceNull === true && coerceNullString(mixedValue) === true) {
      return null;
    }

    if (typeof cast !== 'function') {
      return mixedValue;
    }

    return cast(mixedValue);
  } catch (err) {
    return null;
  }
};

module.exports = {
  DEFAULT_REDACTED,
  redaction,
  getKeyValue,
  castString,
  coerceUndefinedString,
  coerceNullString,
  lowerTrim,
};
