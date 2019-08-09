const DEFAULT_REDACTED = '**********';

const coerce = {
  undefined: value => (typeof value === 'string' && value.trim() === 'undefined' ? undefined : value),
  null: value => (typeof value === 'string' && value.trim() === 'null' ? null : value),
};

const cast = (value, transform, options = {}) => {
  try {
    const { coerceUndefined = true, coerceNull = true, typePassthru = null } = options;
    if (typeof transform !== 'function') {
      return value;
    }

    // undefined filter
    if (coerceUndefined === true && coerce.undefined(value) === undefined) {
      return undefined;
    }

    // null filter
    if (coerceNull === true && coerce.null(value) === null) {
      return null;
    }

    // matching type filter
    if (typePassthru && typeof value === typePassthru) {
      return value;
    }

    // string filter
    if (typeof value !== 'string') {
      return undefined;
    }

    // only string up to this point
    return transform(value);
  } catch (err) {
    // console.error(err);
    return undefined;
  }
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
