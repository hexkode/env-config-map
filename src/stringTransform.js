const toNumber = string => {
  const number = Number(string);
  return Number.isNaN(number) ? undefined : number;
};

const toBoolean = string => {
  if (string === 'true' || string === '1') {
    return true;
  }
  return false;
};

const toArray = string => {
  const results = string.split(',');
  return results.map(result => result.trim());
};

const toObject = string => {
  return JSON.parse(string);
};

module.exports = {
  toNumber,
  toBoolean,
  toArray,
  toObject,
};
