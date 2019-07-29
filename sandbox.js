const envConfigMap = require('./src');

process.env.NODE_ENV = 'sandbox';
process.env.SERVER_PORT = '8080';
process.env.DB_PASSWORD = 'mypassword';
process.env.DB_ENABLE_PROFILER = 'yes';
process.env.EXAMPLE_OBJECT = '{"timeout": 60, "retry": {"max": 5}}';
process.env.EXAMPLE_ARRAY = 'id,email,   dateCreated   ,dateModified';

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

const options = {
  redactedString: 'XXXXXXXXXX',
  typeTransform: {
    boolean: string => (string === 'yes' ? true : false),
  },
};

const config = envConfigMap(configMap, options);

console.log(config);
console.log(config.getRedacted(), 'Log config object with secrets redacted.');

// console.log(config.getDefaultOptions());
// console.log(config.getOptions());
