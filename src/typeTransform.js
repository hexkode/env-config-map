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
 * normalize any type to string type before transform.
 * returns a non-empty trimmed string or undefined.
 *
 * @param {*} param
 * @returns {string|undefined}
 */
const _normalize = param => {
  let normalized = undefined;

  if (typeof param === 'string') {
    const trimmed = param.trim();
    if (trimmed) {
      normalized = trimmed;
    }
  }

  return normalized;
};

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
  _normalize,
};
