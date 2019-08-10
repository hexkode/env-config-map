const string = stringValue => stringValue;

const number = stringValue => (Number.isNaN(Number(stringValue)) ? null : Number(stringValue));

const boolean = (stringValue) => {
  if (stringValue === 'true' || stringValue === '1') return true;
  if (stringValue === 'false' || stringValue === '0') return false;
  return null;
};

const object = (stringValue) => {
  try {
    return JSON.parse(stringValue);
  } catch (err) {
    return null;
  }
};

const arrayCommaDelim = stringValue => stringValue.split(',').map(result => result.trim());

module.exports = {
  string,
  number,
  boolean,
  object,
  arrayCommaDelim,
};
