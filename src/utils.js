const DEFAULT_REDACTED = '**********';

/**
 * Function to generate redacted values.
 *
 * @param {string} str
 * @returns {string}
 */
const redactor = () => DEFAULT_REDACTED;

/**
 * Function to source config values for mapping.
 *
 * @param {string} key
 * @returns {*}
 */
const getter = key => process.env[key];

/**
 * If input is string type, it applies lower case and trim,
 * anything else returns empty string.
 *
 * @param {*} str
 * @returns {string}
 */
const lowerTrim = str => (typeof str === 'string' ? str.toLowerCase().trim() : '');

/**
 * Coerce undefined from string
 *
 * @param {string} str
 * @returns {boolean}
 */
const coerceUndefinedString = str => lowerTrim(str) === 'undefined';

/**
 * Coerce null from string
 *
 * @param {string} str
 * @returns {boolean}
 */
const coerceNullString = str => lowerTrim(str) === 'null';

/**
 * Will only call cast() with a string type value.
 * Any other types will be filtered and returned as undefined or null.
 * Any exceptions encoutered during casting will return null.
 *
 * @param {*} mixed
 * @param {function} cast
 * @param {Object} options
 * @returns {*}
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
