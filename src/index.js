const typeTransform = require('./typeTransform.js');

const defaultOptions = {
  redactedString: '**********',
  typeTransform,
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
  };

  const config = {};
  const redacted = {};

  for (const key in configMap) {
    const keyProps = configMap[key];

    // map to env and handle defaults
    config[key] = process.env[key] || keyProps.default;

    // handle type transform
    if (keyProps.type) {
      config[key] = mergedOptions.typeTransform[keyProps.type](config[key]);
    }

    // generate redacted config
    redacted[key] =
      keyProps.isSecret && config[key]
        ? mergedOptions.redactedString
        : config[key];
  }

  config.getRedacted = () => redacted;
  config.getDefaultOptions = () => defaultOptions;
  config.getOptions = () => mergedOptions;

  return config;
};

module.exports = envConfigMap;
