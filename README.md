# env-config-map

- Map environment variables to app configs. Inspired by the twelve-factor app.
- Zero dependency.

# Quick sandbox demo

```
npm run sandbox
```

# How to use

```
const envConfigMap = require('env-config-map');

const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  APP_NAME: { default: 'noname' },
  SERVER_ADDRESS: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'boolean' },
};
const config = envConfigMap(configMap);

console.log(config);
console.log(config.getRedacted(), 'Log config object with secrets redacted.');
```

## Customize

```
const envConfigMap = require('env-config-map');

const configMap = {
  NODE_ENV: { default: 'development' },
  LOG_LEVEL: { default: 'info' },
  APP_NAME: { default: 'noname' },
  SERVER_ADDRESS: { default: 'localhost' },
  SERVER_PORT: { default: 80, type: 'number' },
  DB_PASSWORD: { isSecret: true },
  DB_ENABLE_PROFILER: { default: false, type: 'boolean' },
};

const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    boolean: (string) => (string === 'ok') ? true : false,
  },
}

const config = envConfigMap(configMap, options);

console.log(config);
console.log(config.getRedacted(), 'Log config object with secrets redacted.');

console.log(config.getDefaultOptions());
console.log(config.getOptions());
```
