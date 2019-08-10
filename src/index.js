// const packageJson = require('../package.json');
const types = require('./types.js');
const utils = require('./utils.js');

const defaultOptions = {
  types,
  getEnv: utils.getEnv,
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
  const opts = {
    ...defaultOptions,
    ...options,
    types: {
      ...defaultOptions.types,
      ...options.types,
    },
  };

  const config = {};
  const redacted = {};

  config.getRedacted = () => redacted;
  config.getOptions = () => opts;

  Object.keys(configMap).forEach((key) => {
    const keyProps = configMap[key];
    let keyValue = opts.getEnv(key);

    if (keyValue === undefined) {
      keyValue = keyProps.default;
    } else {
      const keyType = keyProps.type || 'string';
      const caster = opts.types[keyType];

      const coerceUndefined = typeof keyProps.coerceUndefined === 'boolean' ? keyProps.coerceUndefined : opts.coerceUndefined;
      const coerceNull = typeof keyProps.coerceNull === 'boolean' ? keyProps.coerceNull : opts.coerceNull;

      keyValue = utils.cast(keyValue, caster, {
        coerceUndefined,
        coerceNull,
      });
    }

    config[key] = keyValue;
    redacted[key] = keyProps.redact === true && keyValue ? opts.redaction(keyValue) : keyValue;
  });

  return config;
};

module.exports = envConfigMap;
module.exports.defaultOptions = defaultOptions;
module.exports.types = types;
module.exports.utils = utils;
