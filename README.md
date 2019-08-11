# env-config-map

[![npm](https://img.shields.io/npm/v/env-config-map)](https://www.npmjs.com/package/env-config-map)
[![CircleCI](https://img.shields.io/circleci/build/github/hexkode/env-config-map)](https://circleci.com/gh/hexkode/env-config-map)
[![Coverage Status](https://coveralls.io/repos/github/hexkode/env-config-map/badge.svg?branch=master)](https://coveralls.io/github/hexkode/env-config-map?branch=master)
[![dependencies Status](https://david-dm.org/hexkode/env-config-map/status.svg)](https://david-dm.org/hexkode/env-config-map)

Map environment variables to config object. Mapping options includes common patterns such as set defaults, coerce null and undefined, type casting, and redact secrets from configs for logging.

- Zero dependency.
- Supported types:
  - `string` (default)
  - `number`
  - `boolean`
  - `object`
  - `arrayCommaDelim`
- `redact` option to redact value for logging.
- `coerceNull` option to coerce `"null"` to `null`.
- `coerceUndefined` option to coerce `"undefined"` to `undefined`.
- `getter` options to load input values from other sources. Default source is `process.env`.

## Installation

```console
npm install env-config-map
```

## Run Sandbox Example

```console
npm run sandbox
```

## Sandbox Example

```js
// source from .env (optional)
// require('dotenv').config();

const envConfigMap = require('env-config-map');

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
    booleanYesNo: str => {
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
```

### console.log(config);

```js
{
  SERVER_HOST: '0.0.0.0',
  SERVER_PORT: 8080,
  MAINTENANCE_MODE: true,
  ENABLE_PROFILER: false,
  SETTINGS: { path: '/tmp', timeout: 1000 },
  ACCESS_KEY: 'myAccessKey',
  COERCE_NULL_DEFAULT: null,
  COERCE_NULL_DISABLED: 'null',
  LOG_LEVEL: 'info',
  getRedacted: [Function],
  getOptions: [Function]
}
```

### console.log(config.getRedacted());

```js
{
  SERVER_HOST: '0.0.0.0',
  SERVER_PORT: 8080,
  MAINTENANCE_MODE: true,
  ENABLE_PROFILER: false,
  SETTINGS: { path: '/tmp', timeout: 1000 },
  ACCESS_KEY: '*** REDACTED ***',
  COERCE_NULL_DEFAULT: null,
  COERCE_NULL_DISABLED: 'null',
  LOG_LEVEL: 'info'
}
```

## configMap

- `default` : _mixed_
  - Sets the default value.
- `type` : _string_
  - Specify the type. Cast operation will call the type casting function defined in `options.types`. Supports the following types:
    - `string` (default)
    - `number`
    - `boolean`
    - `object`
    - `arrayCommaDelim`
- `redact` : _boolean_
  - Flag to indicate if the value is a secret and needs to be redacted.
- `coerceNull` : _boolean_
  - Coerce string `'null'` to `null`. Supersedes `options.coerceNull`.
- `coerceUndefined` : _boolean_
  - Coerce string `'undefined'` to `undefined`. Supersedes `options.coerceNull`.

```js
const configMap = {
  SERVER_PORT: { default: 80, type: 'number' },
  ACCESS_KEY: { redact: true },
  ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
  COERCE_DISABLED: { coerceNull: false, coerceUndefined: false },
};
const config = envConfigMap(configMap, options);
```

## options

- `redactor` : _function_
  - Transforms value to the redacted value.
- `types` : _object_
  - Define additional types. Merges with the supported types.
- `getter` : _function_
  - Getter to get value from key. It is also possible to customize via the getters to get values from sources other then `process.env`
- `coerceNull` : _boolean_
  - Coerce string `'null'` to `null`.
- `coerceUndefined` : _boolean_
  - Coerce string `'undefined'` to `undefined`.

```js
const options = {
  getter: key => process.env[key],
  types: {
    // define custom type "booleanYesNo"
    booleanYesNo: str => {
      const normalized = envConfigMap.utils.lowerTrim(str);
      if (normalized === 'yes') return true;
      if (normalized === 'no') return false;
      return null;
    },
  },
  // customized redactor
  redactor: str => str.replace(/.+/, '*** REDACTED ***'),
  coerceNull: true,
  coerceUndefined: false,
};
const config = envConfigMap(configMap, options);
```

## Misc Exports

```js
const envConfigMap = require('env-config-map');
const defaultOptions = envConfigMap.defaultOptions;
const supportedTypes = envConfigMap.types;
const helperUtils = envConfigMap.utils;
```

## Example Server Config with `env-config-map`

### .env

```js
APP_NAME = envConfigMap;
SERVER_PORT = 8080;
ACCESS_KEY = myAccessKey;
```

### config.js

```js
require('dotenv').config();
const envConfigMap = require('env-config-map');

const configMap = {
  APP_NAME: { default: 'noname' },
  SERVER_HOST: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  ACCESS_KEY: { redact: true },
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
  .listen(config.SERVER_PORT, config.SERVER_HOST, () =>
    console.log(
      `server listening on ${config.SERVER_HOST}:${config.SERVER_PORT}`
    )
  );
```
