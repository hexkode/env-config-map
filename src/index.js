const stringTransform = require('./stringTransform.js');

/**
 * Maps process.env to config using configMap.
 * Also generates a redacted version of the config for logging.
 *
 * @param {*} configMap
 */
const envConfigMap = (
  configMap,
  options = {
    redactedString: '**********',
    typeTransform: {
      boolean: stringTransform.toBoolean,
      number: stringTransform.toNumber,
      array: stringTransform.toArray,
      object: stringTransform.toObject,
    },
  }
) => {
  const config = {};
  const redacted = {};

  for (const key in configMap) {
    const keyProps = configMap[key];
    // map to env and handle defaults
    config[key] = process.env[key] || keyProps.default;

    // handle type transform
    if (keyProps.type) {
      config[key] = options.typeTransform[keyProps.type](config[key]);
    }

    // generated redacted config
    redacted[key] =
      keyProps.isSecret && config[key] ? options.redactedString : config[key];
  }

  config.getRedacted = () => redacted;

  return config;
};

module.exports = envConfigMap;
