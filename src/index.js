const types = require('./types.js');
const getEnv = key => process.env[key];
const DEFAULT_REDACTED = '**********';
const redaction = value => value.replace(/.+/, DEFAULT_REDACTED);

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
 */
const envConfigMap = (configMap, options = {}) => {
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

  for (const key in configMap) {
    const keyProps = configMap[key];

    // map to env and handle defaults
    config[key] = mergedOptions.getEnv(key) || keyProps.default;

    // undefined passthru
    let coerceUndefined = mergedOptions.coerceUndefined;
    if (typeof keyProps.coerceUndefined === 'boolean') {
      coerceUndefined = keyProps.coerceUndefined;
    }
    if (coerceUndefined === true) {
      config[key] = types._undefined(config[key]);
    }

    // null passthru
    let coerceNull = mergedOptions.coerceNull;
    if (typeof keyProps.coerceNull === 'boolean') {
      coerceNull = keyProps.coerceNull;
    }
    if (coerceNull === true) {
      config[key] = types._null(config[key]);
    }

    // handle type transform.  default type to string.
    // if no matching type transform is found, value is passed thru.
    const type = keyProps.type || 'string';
    if (typeof mergedOptions.types[type] === 'function') {
      config[key] = mergedOptions.types[type](config[key]);
    }

    // generate redacted config
    if (keyProps.redact === true && config[key]) {
      // handle error
      redacted[key] = mergedOptions.redaction(config[key]);
    } else {
      redacted[key] = config[key];
    }
  }

  config.getRedacted = () => redacted;
  config.getOptions = () => mergedOptions;

  return config;
};

module.exports = envConfigMap;
