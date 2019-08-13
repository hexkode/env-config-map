const utils = require('./utils');

const string = (str) => str;

const number = (str) => (Number.isNaN(Number(str)) ? null : Number(str));

const boolean = (str) => {
  const s = utils.lowerTrim(str);
  if (s === 'true' || s === '1') return true;
  if (s === 'false' || s === '0') return false;
  return null;
};

const object = (str) => JSON.parse(str);

const arrayCommaDelim = (str) => str.split(',').map((result) => result.trim());

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
};
