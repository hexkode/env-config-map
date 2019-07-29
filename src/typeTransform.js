const number = string => {
  const number = Number(string);
  return Number.isNaN(number) ? undefined : number;
};

const boolean = string => {
  if (string === 'true' || string === '1') {
    return true;
  }
  return false;
};

const array = string => {
  const results = string.split(',');
  return results.map(result => result.trim());
};

const object = string => {
  return JSON.parse(string);
};

module.exports = {
  number,
  boolean,
  array,
  object,
};
