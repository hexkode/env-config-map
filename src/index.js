// const packageJson = require('../package.json');
const types = require('./types.js');
const utils = require('./utils.js');

const defaultOptions = {
  getEnv: utils.getEnv,
  types,
  redaction: utils.redaction,
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

    // type transform
    const type = keyProps.type || 'string';
    const coerceUndefined = typeof keyProps.coerceUndefined === 'boolean' ? keyProps.coerceUndefined : mergedOptions.coerceUndefined;
    const coerceNull = typeof keyProps.coerceNull === 'boolean' ? keyProps.coerceNull : mergedOptions.coerceNull;
    keyValue = utils.cast(keyValue, mergedOptions.types[type], { coerceUndefined, coerceNull, typePassthru: type });

    config[key] = keyValue;
    redacted[key] = keyProps.redact === true && keyValue ? mergedOptions.redaction(keyValue) : keyValue;
  });

  config.getRedacted = () => redacted;
  config.getOptions = () => mergedOptions;

  return config;
};

module.exports = envConfigMap;
module.exports.defaultOptions = defaultOptions;
module.exports.types = types;
module.exports.utils = utils;
