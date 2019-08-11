# env-config-map 

[![npm](https://img.shields.io/npm/v/env-config-map)](https://www.npmjs.com/package/env-config-map)
[![CircleCI](https://img.shields.io/circleci/build/github/hexkode/env-config-map)](https://circleci.com/gh/hexkode/env-config-map)
[![Coverage Status](https://coveralls.io/repos/github/hexkode/env-config-map/badge.svg?branch=master)](https://coveralls.io/github/hexkode/env-config-map?branch=master) 
[![dependencies Status](https://david-dm.org/hexkode/env-config-map/status.svg)](https://david-dm.org/hexkode/env-config-map)

Maps environment variables to app configs.  Mapping options includes commonly encountered patterns such as set defaults, coerce null and undefined, type casting, and redact secrets from configs for logging.

- Zero dependency.
- Supported types:
  - `string` (default)
  - `number`
  - `boolean`
  - `object`
  - `arrayCommaDelim`  
- `redact` option to redact value for logging.
- `coerceNull` and `coerceUndefined` options to coerce string 'null' to null and string 'undefined' to undefined.
   
## Installation
```console
npm install env-config-map
```

## Run sandbox example
```console
npm run sandbox
```

### Sandbox example
```js
// source from .env (optional)
// require('dotenv').config();

const envConfigMap = require('env-config-map');

// set fixture values for sandbox example
process.env.NODE_ENV = 'test';
process.env.SERVER_PORT = '8080';
process.env.ENABLE_CORS = 'true';
process.env.DB_PASSWORD = 'mypassword';
process.env.DB_ENABLE_PROFILER = 'YES';
process.env.EXAMPLE_OBJECT = '{ "retry": 3, "timeout": 1000 } ';
process.env.EXAMPLE_OBJECT_INVALID = '{ "retry": 3, "timeout": 1000 ';
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
  EXAMPLE_OBJECT_INVALID: { type: 'object' },
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
    booleanYesNo: (stringValue) => {
      const normalized = envConfigMap.utils.lowerTrim(stringValue);
      if (normalized === 'yes') return true;
      if (normalized === 'no') return false;
      return null;
    },
  },
  redaction: stringValue => stringValue.replace(/.+/, 'XXXXXXXXXX'),
};

// map env vars to config using envConfigMap
const config = envConfigMap(configMap, options);

// log output
console.log(config);
console.log(config.getRedacted());
```

### Sandbox example output:
console.log(config);
```js
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_HOST: undefined,
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'mypassword',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { retry: 3, timeout: 1000 },
  EXAMPLE_OBJECT_INVALID: undefined,
  EXAMPLE_ARRAY: [ 'a', 1 ],
  EXAMPLE_ARRAY_COMMA_DELIM: [ 'id', 'email', 'dateCreated', 'dateModified' ],
  INVALID_TYPE: 'passthru          ',
  COERCE_UNDEFINED: undefined,
  COERCE_NULL: null,
  COERCE_NULL_DISABLED: 'null',
  getRedacted: [Function],
  getOptions: [Function]
}
```

console.log(config.getRedacted());
```js
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_HOST: undefined,
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'XXXXXXXXXX',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { retry: 3, timeout: 1000 },
  EXAMPLE_OBJECT_INVALID: undefined,
  EXAMPLE_ARRAY: [ 'a', 1 ],
  EXAMPLE_ARRAY_COMMA_DELIM: [ 'id', 'email', 'dateCreated', 'dateModified' ],
  INVALID_TYPE: 'passthru          ',
  COERCE_UNDEFINED: undefined,
  COERCE_NULL: null,
  COERCE_NULL_DISABLED: 'null'
}
```

## Options
- `redaction` : *function* - Transforms value to the redacted value.
- `types` : *object* -  Define additional types.  Merges with the default types.
- `getKeyValue` : *function* - Getter to get value from key.
- `coerceNull` : *boolean* - Coerce string `'null'` to `null`.
- `coerceUndefined` : *boolean* - Coerce string `'undefined'` to `undefined`.

```js
const options = {
  getKeyValue: key => process.env[key],
  types: {
    // define custom type "booleanYesNo"
    booleanYesNo: (stringValue) => {
      const normalized = envConfigMap.utils.lowerTrim(stringValue);
      if (normalized === 'yes') return true;
      if (normalized === 'no') return false;
      return null;
    },
  },
  redaction: stringValue => stringValue.replace(/.+/, 'XXXXXXXXXX'),
  coerceNull: true,
  coerceUndefined: false,
};
const config = envConfigMap(configMap, options);
```

## Props for configMap
- `default` : *mixed* - Default value.  
- `type` : *string* - Specify the type.  Cast operation will call the type casting function defined in `options.types`.
  - `string`
  - `number`
  - `boolean`
  - `object`
  - `arrayCommaDelim`
- `redact` : *boolean* - Redact value with options.redaction().
- `coerceNull` : *boolean* - Coerce string `'null'` to `null`.  Supersedes `options.coerceNull`.
- `coerceUndefined` : *boolean* - Coerce string `'undefined'` to `undefined`.  Supersedes `options.coerceNull`.

```js
const configMap = {
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { redact: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  COERCE_DISABLED: { coerceNull: false, coerceUndefined: false },
};
```

## Misc Exports
```js
const envConfigMap = require('env-config-map');
const defaultOptions = envConfigMap.defaultOptions
const supportedTypeConverters = envConfigMap.types
const helperUtils = envConfigMap.utils
```

## App Example with default options
.env
```js
NODE_ENV=test
LOG_LEVEL=debug
APP_NAME=env-config-map
SERVER_PORT=8080
DB_PASSWORD=mypassword
```

config.js
```js
require('dotenv').config();
const envConfigMap = require('env-config-map');

const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  APP_NAME: { default: 'noname' },
  SERVER_HOST: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { redact: true },
};
const config = envConfigMap(configMap);

module.exports = config;
```

server.js
```js
const http = require('http');
const config = require('./config.js');

console.log('Configs loaded.', config.getRedacted());

http
  .createServer((req, res) => {
    res.write(`Hello ${config.APP_NAME}!`);
    res.end();
  })
  .listen(
    config.SERVER_PORT, 
    config.SERVER_HOST, 
    () => console.log(`server listening on ${config.SERVER_HOST}:${config.SERVER_PORT}`));
```