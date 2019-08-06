# env-config-map 

[![CircleCI](https://circleci.com/gh/hexkode/env-config-map.svg?style=svg)](https://circleci.com/gh/hexkode/env-config-map)
[![Coverage Status](https://coveralls.io/repos/github/hexkode/env-config-map/badge.svg?branch=master)](https://coveralls.io/github/hexkode/env-config-map?branch=master) 

- Map environment variables to app configs. Inspired by the twelve-factor app.
- Zero dependency.
- Supported types:
  - string (default)
  - number
  - boolean
  - object
  - arrayCommaDelim
  - *supports custom types*
- isSecret flag to redact value for logging. *(see getRedacted())*
- passthru option to allow 'null' as null or 'undefined' as undefined.
   
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
process.env.MISSING_TYPE_TRANSFORM = 'passthru          ';
process.env.UNDEFINED_PASSTHRU = 'undefined';
process.env.NULL_PASSTHRU = 'null';
process.env.NULL_PASSTHRU_DISALBED = 'null';

// define config map
const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  SERVER_HOST: {},
  SERVER_PORT: { default: 80, type: 'number' },
  ENABLE_CORS: { default: false, type: 'boolean' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  EXAMPLE_OBJECT: { type: 'object' },
  EXAMPLE_OBJECT_INVALID: { type: 'object' },
  EXAMPLE_ARRAY: { type: 'object' },
  EXAMPLE_ARRAY_COMMA_DELIM: { type: 'arrayCommaDelim' },
  MISSING_TYPE_TRANSFORM: { type: 'typeNotDefined' },
  UNDEFINED_PASSTHRU: {},
  NULL_PASSTHRU: {},
  NULL_PASSTHRU_DISALBED: { nullPassthru: false },
};

// customize with options
const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    booleanYesNo: string => (string === 'yes' ? true : false),
  },
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
  MISSING_TYPE_TRANSFORM: 'passthru          ',
  UNDEFINED_PASSTHRU: undefined,
  NULL_PASSTHRU: null,
  NULL_PASSTHRU_DISALBED: 'null',  
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
  MISSING_TYPE_TRANSFORM: 'passthru          '
  UNDEFINED_PASSTHRU: undefined,
  NULL_PASSTHRU: null,
  NULL_PASSTHRU_DISALBED: 'null',  
}
```

## Options
- redactedString
- typeTransform
- getEnv
- nullPassthru (default: true)
- undefinedPassthru (default: true)
```js
const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    // define custom type "booleanYesNo"
    booleanYesNo: string => (string === 'yes' ? true : false),
  },
  getEnv: key => process.env[key],
  nullPassthru: true,
  undefinedPassthru: false,
};
const config = envConfigMap(configMap, options);
```

## Props for configMap
- default
- type
- isSecret
- nullPassthru
- undefinedPassthru

```js
const configMap = {
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  PASSTHRU_DISABLED: { nullPassthru: false, undefinedPassthru: false },
};
```
