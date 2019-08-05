const typeTransform = require('./typeTransform.js');
const getEnv = key => process.env[key];

const defaultOptions = {
  redactedString: '**********',
  typeTransform,
  getEnv,
};

/**
 * Maps process.env to config using configMap.
 * Also generates a redacted version of the config for logging.
 *
 * @param {*} configMap
 */
const envConfigMap = (configMap, options = {}) => {
  // TODO: manual merge for now.  use deep merge lib?
  const mergedOptions = {
    redactedString: options.redactedString || defaultOptions.redactedString,
    typeTransform: {
      ...defaultOptions.typeTransform,
      ...options.typeTransform,
    },
    getEnv: options.getEnv || defaultOptions.getEnv,
  };

  const config = {};
  const redacted = {};

  for (const key in configMap) {
    const keyOptions = configMap[key];

    // map to env and handle defaults
    config[key] = mergedOptions.getEnv(key) || keyOptions.default;

    // handle type transform.  default type to string.
    // if no matching type transform is found, value is passed thru
    const type = keyOptions.type || 'string';
    if (typeof mergedOptions.typeTransform[type] === 'function') {
      config[key] = mergedOptions.typeTransform[type](config[key]);
    }

    // generate redacted config
    redacted[key] = keyOptions.isSecret && config[key] ? mergedOptions.redactedString : config[key];
  }

  config.getRedacted = () => redacted;
  config.getOptions = () => mergedOptions;

  return config;
};

module.exports = envConfigMap;
