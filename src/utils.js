const DEFAULT_REDACTED = '**********';

const redactor = () => DEFAULT_REDACTED;

const getter = key => process.env[key];

const lowerTrim = str => (typeof str === 'string' ? str.toLowerCase().trim() : '');

const coerceUndefinedString = str => lowerTrim(str) === 'undefined';

const coerceNullString = str => lowerTrim(str) === 'null';

/**
 * Will only call cast() with string value.
 * Any other types will be filtered and returned as undefined or null.
 * Any exceptions encoutered during casting will return null.
 *
 * @param {*} mixed
 * @param {function} cast
 * @param {object} options
 */
const convert = (mixed, cast, options = {}) => {
  try {
    const { coerceUndefined = true, coerceNull = true } = options;

    if (typeof mixed !== 'string') {
      return mixed === undefined ? undefined : null;
    }

    if (coerceUndefined === true && coerceUndefinedString(mixed) === true) {
      return undefined;
    }

    if (coerceNull === true && coerceNullString(mixed) === true) {
      return null;
    }

    if (typeof cast !== 'function') {
      return mixed;
    }

    return cast(mixed);
  } catch (err) {
    return null;
  }
};

module.exports = {
  DEFAULT_REDACTED,
  redactor,
  getter,
  convert,
  coerceUndefinedString,
  coerceNullString,
  lowerTrim,
};
