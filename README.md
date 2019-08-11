# env-config-map 

[![npm](https://img.shields.io/npm/v/env-config-map)](https://www.npmjs.com/package/env-config-map)
[![CircleCI](https://img.shields.io/circleci/build/github/hexkode/env-config-map)](https://circleci.com/gh/hexkode/env-config-map)
[![Coverage Status](https://coveralls.io/repos/github/hexkode/env-config-map/badge.svg?branch=master)](https://coveralls.io/github/hexkode/env-config-map?branch=master) 
[![dependencies Status](https://david-dm.org/hexkode/env-config-map/status.svg)](https://david-dm.org/hexkode/env-config-map)

Maps environment variables to config object.  Mapping options includes commonly encountered patterns such as set defaults, coerce null and undefined, type casting, and redact secrets from configs for logging.

- Zero dependency.
- Supported types:
  - `string` (default)
  - `number`
  - `boolean`
  - `object`
  - `arrayCommaDelim`  
- `redact` option to redact value for logging.
- `coerceNull` options to coerce `"null"` to `null`.
- `coerceUndefined` options to coerce `"undefined"` to `undefined`.
- Customizable to get input values from sources other then `process.env.`
   
## Installation
```console
npm install env-config-map
```

## Run Sandbox Example
```console
npm run sandbox
```

### Sandbox Example
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
process.env.COERCE_NULL = 'null';
process.env.COERCE_NULL_DISABLED = 'null';

// define config map
const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  SERVER_HOST: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  ENABLE_CORS: { default: false, type: 'boolean' },
  DB_PASSWORD: { redact: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
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
```

### Sandbox Example Output:
#### console.log(config);
```js
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_HOST: 'localhost',
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'mypassword',
  DB_ENABLE_PROFILER: true,
  COERCE_NULL: null,
  COERCE_NULL_DISABLED: 'null',
  getRedacted: [Function],
  getOptions: [Function]  
}
```

#### console.log(config.getRedacted());
```js
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_HOST: 'localhost',
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'XXXXXXXXXX',
  DB_ENABLE_PROFILER: true,
  COERCE_NULL: null,
  COERCE_NULL_DISABLED: 'null' 
}
```

## Options
- `redactor` : *function*
  - Transforms value to the redacted value.
- `types` : *object*
  - Define additional types.  Merges with the supported types.
- `getter` : *function* 
  - Getter to get value from key.  It is also possible to customize via the getters to get values from sources other then `process.env`
- `coerceNull` : *boolean* 
  - Coerce string `'null'` to `null`.
- `coerceUndefined` : *boolean* 
  - Coerce string `'undefined'` to `undefined`.

```js
const options = {
  getter: key => process.env[key],
  types: {
    // define custom type "booleanYesNo"
    booleanYesNo: (str) => {
      const normalized = envConfigMap.utils.lowerTrim(str);
      if (normalized === 'yes') return true;
      if (normalized === 'no') return false;
      return null;
    },
  },
  // customized redactor
  redactor: str => str.replace(/.+/, 'XXXXXXXXXX'),
  coerceNull: true,
  coerceUndefined: false,
};
const config = envConfigMap(configMap, options);
```

## Props for configMap
- `default` : *mixed*
  - Sets the default value.  
- `type` : *string* 
  - Specify the type.  Cast operation will call the type casting function defined in `options.types`.  Supports the following types:
    - `string` (default)
    - `number`
    - `boolean`
    - `object`
    - `arrayCommaDelim`
- `redact` : *boolean*
  - Flag to indicate if the value is a secret and needs to be redacted.
- `coerceNull` : *boolean*
  - Coerce string `'null'` to `null`.  Supersedes `options.coerceNull`.
- `coerceUndefined` : *boolean*
  - Coerce string `'undefined'` to `undefined`.  Supersedes `options.coerceNull`.

```js
const configMap = {
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { redact: true },
  DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  COERCE_DISABLED: { coerceNull: false, coerceUndefined: false },
};
const config = envConfigMap(configMap, options);
```

## Misc Exports
```js
const envConfigMap = require('env-config-map');
const defaultOptions = envConfigMap.defaultOptions
const supportedTypeConverters = envConfigMap.types
const helperUtils = envConfigMap.utils
```

## Example App with Default Options
### .env
```js
NODE_ENV=test
LOG_LEVEL=debug
APP_NAME=env-config-map
SERVER_PORT=8080
DB_PASSWORD=mypassword
```

### config.js
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

### server.js
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