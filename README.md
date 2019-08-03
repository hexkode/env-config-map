[![CircleCI](https://circleci.com/gh/hexkode/env-config-map.svg?style=svg)](https://circleci.com/gh/hexkode/env-config-map)

# env-config-map
- Map environment variables to app configs. Inspired by the twelve-factor app.
- Zero dependency.
- Supported types:
  - number
  - boolean
  - object
  - arrayCommaDelim
  - *also supports custom type*
- isSecret flag to redact value for logging. *(see getRedacted())*

# Run sandbox example
```console
npm run sandbox
```

# Sandbox example
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
process.env.EXAMPLE_ARRAY = '[ "a", 1 ]';
process.env.EXAMPLE_ARRAY_COMMA_DELIM = 'id,email,   dateCreated   ,dateModified';
process.env.NOT_IN_CONFIG_MAP = 'not mapped';

// define config map
const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  SERVER_ADDRESS: {},
  SERVER_PORT: { default: 80, type: 'number' },
  ENABLE_CORS: { default: false, type: 'boolean' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'yesNoBool' },
  EXAMPLE_OBJECT: { type: 'object' },
  EXAMPLE_ARRAY: { type: 'object' },
  EXAMPLE_ARRAY_COMMA_DELIM: { type: 'arrayCommaDelim' },
};

// customize with options
const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    yesNoBool: string => (string === 'yes' ? true : false),
  },
};

// map env vars to config using envConfigMap
const config = envConfigMap(configMap, options);

// log output
console.log(config);
console.log(config.getRedacted());
```

# Sandbox example output:
`console.log(config);`
```js
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_ADDRESS: undefined,
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'mypassword',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { retry: 3, timeout: 1000 },
  EXAMPLE_ARRAY: [ 'a', 1 ],
  EXAMPLE_ARRAY_COMMA_DELIM: [ 'id', 'email', 'dateCreated', 'dateModified' ],
  getRedacted: [Function],
  getDefaultOptions: [Function],
  getOptions: [Function]
}
```
`console.log(config.getRedacted());`
```js
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_ADDRESS: undefined,
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'XXXXXXXXXX',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { retry: 3, timeout: 1000 },
  EXAMPLE_ARRAY: [ 'a', 1 ],
  EXAMPLE_ARRAY_COMMA_DELIM: [ 'id', 'email', 'dateCreated', 'dateModified' ]
}
```

# Options
- redactedString
- typeTransform
- getEnv

```js
const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    // define custom type "yesNoBool"
    yesNoBool: string => (string === 'yes' ? true : false),
  },
  getEnv: key => process.env[key];
}
const config = envConfigMap(configMap, options);
```

# configMap props
- default
- type
- isSecret

```js
const configMap = {
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'yesNoBool' },
};
```