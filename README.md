# env-config-map
- Map environment variables to app configs. Inspired by the twelve-factor app.
- Zero dependency.

# Run sandbox example
```console
npm run sandbox
```

# Sandbox example
```js
// source from .env (optional)
// require('dotenv').config();

const envConfigMap = require('env-config-map');

// set fixture values for sandbox example
process.env.NODE_ENV = 'test';
process.env.SERVER_PORT = '8080';
process.env.ENABLE_CORS = 'true';
process.env.DB_PASSWORD = 'mypassword';
process.env.DB_ENABLE_PROFILER = 'yes';
process.env.EXAMPLE_OBJECT = '{"retyr": 3, "timeout": 1000 }';
process.env.EXAMPLE_ARRAY = 'id,email,   dateCreated   ,dateModified';
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
  EXAMPLE_ARRAY: { type: 'array' },
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
```json
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_ADDRESS: undefined,
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'mypassword',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { retyr: 3, timeout: 1000 },
  EXAMPLE_ARRAY: [ 'id', 'email', 'dateCreated', 'dateModified' ],
  getRedacted: [Function],
  getDefaultOptions: [Function],
  getOptions: [Function] 
}
```
`console.log(config.getRedacted());`
```json
{ 
  NODE_ENV: 'test',
  LOG_LEVEL: 'info',
  SERVER_ADDRESS: undefined,
  SERVER_PORT: 8080,
  ENABLE_CORS: true,
  DB_PASSWORD: 'XXXXXXXXXX',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { retyr: 3, timeout: 1000 },
  EXAMPLE_ARRAY: [ 'id', 'email', 'dateCreated', 'dateModified' ]
}
```