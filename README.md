# env-config-map

- Map environment variables to app configs. Inspired by the twelve-factor app.
- Zero dependency.

# Quick sandbox demo

```
npm run sandbox
```

# Example

```
require('dotenv').config();
const envConfigMap = require('env-config-map');

// set fixture values for sandbox example
process.env.NODE_ENV = 'sandbox';
process.env.SERVER_PORT = '8080';
process.env.DB_PASSWORD = 'mypassword';
process.env.DB_ENABLE_PROFILER = 'yes';
process.env.EXAMPLE_OBJECT = '{"timeout": 60, "retry": {"max": 5}}';
process.env.EXAMPLE_ARRAY = 'id,email,   dateCreated   ,dateModified';

// define config map
const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  SERVER_ADDRESS: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'boolean' },
  EXAMPLE_OBJECT: { type: 'object' },
  EXAMPLE_ARRAY: { type: 'array' },
};

// customize with options
const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    boolean: string => (string === 'yes' ? true : false),
  },
};

// map env vars to config using envConfigMap
const config = envConfigMap(configMap, options);

// log output
console.log(config);
console.log(config.getRedacted(), 'Log config object with secrets redacted.');

// console.log(config.getDefaultOptions());
// console.log(config.getOptions());

```
# Example Output:
```
// console.log(config);
{ 
  NODE_ENV: 'sandbox',
  LOG_LEVEL: 'info',
  SERVER_ADDRESS: 'localhost',
  SERVER_PORT: 8080,
  DB_PASSWORD: 'mypassword',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { timeout: 60, retry: { max: 5 } },
  EXAMPLE_ARRAY: [ 'id', 'email', 'dateCreated', 'dateModified' ],
  getRedacted: [Function],
  getDefaultOptions: [Function],
  getOptions: [Function] 
}

// console.log(config.getRedacted(), 'Log config object with secrets redacted.');
{ 
  NODE_ENV: 'sandbox',
  LOG_LEVEL: 'info',
  SERVER_ADDRESS: 'localhost',
  SERVER_PORT: 8080,
  DB_PASSWORD: 'XXXXXXXXXX',
  DB_ENABLE_PROFILER: true,
  EXAMPLE_OBJECT: { timeout: 60, retry: { max: 5 } },
  EXAMPLE_ARRAY: [ 'id', 'email', 'dateCreated', 'dateModified' ] 
}
```