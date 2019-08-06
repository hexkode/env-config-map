# env-config-map 

[![npm](https://img.shields.io/npm/v/env-config-map)](https://www.npmjs.com/package/env-config-map)
[![CircleCI](https://img.shields.io/circleci/build/github/hexkode/env-config-map)](https://circleci.com/gh/hexkode/env-config-map)
[![Coverage Status](https://coveralls.io/repos/github/hexkode/env-config-map/badge.svg?branch=master)](https://coveralls.io/github/hexkode/env-config-map?branch=master) 
[![dependencies Status](https://david-dm.org/hexkode/env-config-map/status.svg)](https://david-dm.org/hexkode/env-config-map)

- Map environment variables to app configs. Inspired by the twelve-factor app.
- Zero dependency.
- Supported types:
  - string (default)
  - number
  - boolean
  - object
  - arrayCommaDelim
  - *supports custom types*
- redact option to redact value for logging. *(see getRedacted())*
- coerceNull and coerceUndefined options to allow 'null' as null or 'undefined' as undefined.
   
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

const envConfigMap = require('./index.js');

// set fixture values for sandbox example
process.env.NODE_ENV = 'test';
process.env.SERVER_PORT = '8080';
process.env.ENABLE_CORS = 'true';
process.env.DB_PASSWORD = 'mypassword';
process.env.DB_ENABLE_PROFILER = 'yes';
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
    booleanYesNo: string => (string === 'yes' ? true : false),
  },
  redaction: value => value.replace(/.+/, 'XXXXXXXXXX'),
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
- redaction
- types
- getEnv
- nullPassthru (default: true)
- undefinedPassthru (default: true)
```js
const options = {
  getEnv: key => process.env[key],
  types: {
    // define custom type "booleanYesNo"
    booleanYesNo: string => (string === 'yes' ? true : false),
  },
  redaction: value => value.replace(/.+/, '**********'),
  coerceNull: true,
  coerceUndefined: true,
};
const config = envConfigMap(configMap, options);
```

## Props for configMap
- default
- type
- redact
- coerceNull
- coerceUndefined

```js
const configMap = {
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { redact: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  COERCE_DISABLED: { coerceNull: false, coerceUndefined: false },
};
```
