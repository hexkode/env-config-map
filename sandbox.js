/* eslint-disable no-console */
// source from .env (optional)
// require('dotenv').config();

const envConfigMap = require('./index');

// setup fixture data for example
process.env.SERVER_HOST = '0.0.0.0';
process.env.SERVER_PORT = 8080;
process.env.MAINTENANCE_MODE = 'true';
process.env.ENABLE_PROFILER = 'NO';
process.env.SETTINGS = '{ "path": "/tmp", "timeout": 1000 } ';
process.env.ACCESS_KEY = 'myAccessKey';
process.env.COERCE_NULL_DEFAULT = 'null';
process.env.COERCE_NULL_DISABLED = 'null';
// process.env.LOG_LEVEL = undefined;

const configMap = {
  SERVER_HOST: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  MAINTENANCE_MODE: { default: false, type: 'boolean' },
  ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  SETTINGS: { type: 'object' },
  ACCESS_KEY: { redact: true },
  COERCE_NULL_DEFAULT: {},
  COERCE_NULL_DISABLED: { coerceNull: false },
  LOG_LEVEL: { default: 'info' },
};

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
  redactor: str => str.replace(/.+/, '*** REDACTED ***'),
};

const config = envConfigMap(configMap, options);

console.log(config);
console.log(config.getRedacted());
