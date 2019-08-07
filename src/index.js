// const packageJson = require('../package.json');
const types = require('./types.js');

const getEnv = key => process.env[key];
const DEFAULT_REDACTED = '**********';
const redaction = () => DEFAULT_REDACTED;

const defaultOptions = {
  getEnv,
  types,
  redaction,
  coerceUndefined: true,
  coerceNull: true,
};

/**
 * Maps process.env to config using configMap.
 * Also generates a redacted version of the config for logging.
 *
 * @param {*} configMap
 * @param {*} options
 */
const envConfigMap = (configMap = {}, options = {}) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    types: {
      ...defaultOptions.types,
      ...options.types,
    },
  };

  const config = {};
  const redacted = {};

  Object.keys(configMap).forEach((key) => {
    const keyProps = configMap[key];

    // map to env and handle defaults
    let keyValue = mergedOptions.getEnv(key) || keyProps.default;

    // undefined passthru
    const coerceUndefined = typeof keyProps.coerceUndefined === 'boolean' ? keyProps.coerceUndefined : mergedOptions.coerceUndefined;
    if (coerceUndefined === true) {
      keyValue = types.coerceUndefined(keyValue);
    }

    // null passthru
    const coerceNull = typeof keyProps.coerceNull === 'boolean' ? keyProps.coerceNull : mergedOptions.coerceNull;
    if (coerceNull === true) {
      keyValue = types.coerceNull(keyValue);
    }

    // handle type transform.  default type to string.
    // if no matching type transform is found, value is passed thru.
    const type = keyProps.type || 'string';
    if (typeof mergedOptions.types[type] === 'function') {
      keyValue = mergedOptions.types[type](keyValue);
    }

    // generate redacted config
    let keyValueRedacted = keyValue;
    if (keyProps.redact === true && keyValue) {
      keyValueRedacted = mergedOptions.redaction(keyValue);
    }

    config[key] = keyValue;
    redacted[key] = keyValueRedacted;
  });

  config.getRedacted = () => redacted;
  config.getOptions = () => mergedOptions;

  return config;
};

module.exports = envConfigMap;
