const string = stringValue => stringValue;
const number = stringValue => (Number.isNaN(Number(stringValue)) ? undefined : Number(stringValue));
const boolean = (stringValue) => {
  if (stringValue === 'true' || stringValue === '1') return true;
  if (stringValue === 'false' || stringValue === '0') return false;
  return undefined;
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
