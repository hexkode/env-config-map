const packageJson = require('../package.json');

const string = string => {
  if (typeof string === 'string') return string.trim();
  return _normalize(string);
};

const number = string => {
  if (typeof string === 'number') return string;

  const normalized = _normalize(string);
  if (!normalized) return normalized;

  const number = Number(normalized);
  return Number.isNaN(number) ? undefined : number;
};

const boolean = string => {
  if (typeof string === 'boolean') return string;

  const normalized = _normalize(string);
  if (!normalized) return normalized;

  if (normalized === 'true' || normalized === '1') {
    return true;
  } else if (normalized === 'false' || normalized === '0') {
    return false;
  } else {
    return undefined;
  }
};

const object = string => {
  if (typeof string === 'object') return string;

  const normalized = _normalize(string);
  if (!normalized) return normalized;

  let results = undefined;
  try {
    results = JSON.parse(normalized);
  } catch (err) {
    // console.error(`[${packageJson.name}] Exception encountered when converting from stringify json to object.`, err);
  }

  return results;
};

const arrayCommaDelim = string => {
  const normalized = _normalize(string);
  if (!normalized) return normalized;

  const results = normalized.split(',');
  return results.map(result => result.trim());
};

/**
 * normalize any type to non-empty trimmed string before transform.
 * undefined and null are passed thru.
 *
 * @param {*} value
 * @param {string|null|undefined} options
 */
const _normalize = value => {
  let normalized = undefined;

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

const _undefined = value => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === 'undefined') {
      return undefined;
    }
  }

  return value;
};

const _null = value => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === 'null') {
      return null;
    }
  }

  return value;
};

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
  _normalize,
  _undefined,
  _null,
};
