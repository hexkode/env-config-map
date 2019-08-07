// const packageJson = require('../package.json');

/**
 * normalize any type to non-empty trimmed string before transform.
 * undefined and null are passed thru.
 *
 * @param {*} value
 * @param {string|null|undefined} options
 */
const normalize = (value) => {
  let normalized;

  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      normalized = trimmed;
    }
  }

  return normalized;
};

const coerceUndefined = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === 'undefined') {
      return undefined;
    }
  }

  return value;
};

const coerceNull = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === 'null') {
      return null;
    }
  }

  return value;
};

const string = (value) => {
  if (typeof value === 'string') return value.trim();
  return normalize(value);
};

const number = (value) => {
  if (typeof value === 'number') return value;

  const normalized = normalize(value);
  if (!normalized) return normalized;

  const num = Number(normalized);
  return Number.isNaN(num) ? undefined : num;
};

const boolean = (value) => {
  if (typeof value === 'boolean') return value;

  const normalized = normalize(value);
  if (!normalized) return normalized;

  if (normalized === 'true' || normalized === '1') {
    return true;
  }
  if (normalized === 'false' || normalized === '0') {
    return false;
  }
  return undefined;
};

const object = (value) => {
  if (typeof value === 'object') return value;

  const normalized = normalize(value);
  if (!normalized) return normalized;

  let results;
  try {
    results = JSON.parse(normalized);
  } catch (err) {
    // console.error(`[${packageJson.name}] Exception encountered when converting from stringify json to object.`, err);
  }

  return results;
};

const arrayCommaDelim = (value) => {
  const normalized = normalize(value);
  if (!normalized) return normalized;

  return normalized.split(',').map(result => result.trim());
};

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
  normalize,
  coerceUndefined,
  coerceNull,
};
