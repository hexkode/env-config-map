const packageJson = require('../package.json');

const string = string => {
  if (typeof string === 'string') {
    return string.trim();
  }
  return _normalize(string);
};

const number = string => {
  const normalized = _normalize(string);
  if (!normalized) return normalized;

  const number = Number(normalized);
  return Number.isNaN(number) ? undefined : number;
};

const boolean = string => {
  const normalized = _normalize(string);
  if (!normalized) return normalized;

  if (normalized === 'true' || normalized === '1') {
    return true;
  } else {
    return false;
  }
};

const object = string => {
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

// normalize to string for type conversion.
// returns non empty trimmed string or undefined.
const _normalize = string => {
  let normalized = undefined;

  if (typeof string === 'string') {
    const trimmed = string.trim();
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
