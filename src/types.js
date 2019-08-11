const utils = require('./utils');

const string = (mixedValue, options) => {
  const convert = stringValue => stringValue;
  return utils.convertString(mixedValue, convert, options);
};

const number = (mixedValue, options) => {
  const convert = stringValue => (Number.isNaN(Number(stringValue)) ? null : Number(stringValue));
  return utils.convertString(mixedValue, convert, options);
};

const boolean = (mixedValue, options) => {
  const convert = (stringValue) => {
    const normalized = utils.lowerTrim(stringValue);
    if (normalized === 'true' || normalized === '1') return true;
    if (normalized === 'false' || normalized === '0') return false;
    return null;
  };
  return utils.convertString(mixedValue, convert, options);
};

const object = (mixedValue, options) => {
  const convert = (stringValue) => {
    try {
      return JSON.parse(stringValue);
    } catch (err) {
      return null;
    }
  };
  return utils.convertString(mixedValue, convert, options);
};

const arrayCommaDelim = (mixedValue, options) => {
  const convert = stringValue => stringValue.split(',').map(result => result.trim());
  return utils.convertString(mixedValue, convert, options);
};

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
};
