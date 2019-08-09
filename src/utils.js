const DEFAULT_REDACTED = '**********';

const coerce = {
  undefined: value => (typeof value === 'string' && value.trim() === 'undefined' ? undefined : value),
  null: value => (typeof value === 'string' && value.trim() === 'null' ? null : value),
};

const cast = (value, caster, options = {}) => {
  try {
    const { coerceUndefined = true, coerceNull = true, passthru = null } = options;

    if (typeof caster !== 'function') {
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

    // passthru filter
    if (typeof passthru === 'function' && passthru(value) === true) {
      return value;
    }

    // string filter
    if (typeof value !== 'string') {
      return undefined;
    }

    // string is the only type allowed up to this point
    return caster(value);
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
