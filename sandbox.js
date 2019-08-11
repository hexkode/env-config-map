/* eslint-disable no-console */
// source from .env (optional)
// require('dotenv').config();

const envConfigMap = require('./index.js');

// set fixture values for sandbox example
process.env.NODE_ENV = 'test';
process.env.SERVER_PORT = '8080';
process.env.ENABLE_CORS = 'true';
process.env.DB_PASSWORD = 'mypassword';
process.env.DB_ENABLE_PROFILER = 'YES';
process.env.EXAMPLE_OBJECT = '{ "retry": 3, "timeout": 1000 } ';
process.env.EXAMPLE_ARRAY = '[ "a", 1 ]';
process.env.EXAMPLE_ARRAY_COMMA_DELIM = 'id,email,   dateCreated   ,dateModified';
process.env.NOT_IN_CONFIG_MAP = 'not mapped';
process.env.INVALID_TYPE = 'passthru          ';
process.env.COERCE_UNDEFINED = 'undefined';
process.env.COERCE_NULL = 'null';
process.env.COERCE_NULL_DISABLED = 'null';

// define config map
const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  SERVER_HOST: {},
  SERVER_PORT: { default: 80, type: 'number' },
  ENABLE_CORS: { default: false, type: 'boolean' },
  DB_PASSWORD: { redact: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  EXAMPLE_OBJECT: { type: 'object' },
  EXAMPLE_ARRAY: { type: 'object' },
  EXAMPLE_ARRAY_COMMA_DELIM: { type: 'arrayCommaDelim' },
  INVALID_TYPE: { type: 'typeNotDefined' },
  COERCE_UNDEFINED: {},
  COERCE_NULL: {},
  COERCE_NULL_DISABLED: { coerceNull: false },
};

// customize with options
const options = {
  types: {
    // define custom type "booleanYesNo"
    booleanYesNo: (str) => {
      const normalized = envConfigMap.utils.lowerTrim(str);
      if (normalized === 'yes') return true;
      if (normalized === 'no') return false;
      return null;
    },
  },
  // customize redactor
  redactor: str => str.replace(/.+/, 'XXXXXXXXXX'),
};

// map env vars to config using envConfigMap
const config = envConfigMap(configMap, options);

// log output
console.log(config);
console.log(config.getRedacted());
