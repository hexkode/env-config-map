const utils = require('./utils');

const string = stringValue => stringValue;

const number = stringValue => (Number.isNaN(Number(stringValue)) ? null : Number(stringValue));

const boolean = (stringValue) => {
  const normalized = utils.lowerTrim(stringValue);
  if (normalized === 'true' || normalized === '1') return true;
  if (normalized === 'false' || normalized === '0') return false;
  return null;
};

const object = stringValue => JSON.parse(stringValue);

const arrayCommaDelim = stringValue => stringValue.split(',').map(result => result.trim());

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
};
