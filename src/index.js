const types = require('./types.js');
const utils = require('./utils.js');

const defaultOptions = {
  types,
  getKeyValue: utils.getKeyValue,
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
    const keyValue = opts.getKeyValue(key);
    const keyType = keyProps.type || 'string';
    const cast = opts.types[keyType];
    // eslint-disable-next-line max-len
    const coerceUndefined = typeof keyProps.coerceUndefined === 'boolean' ? keyProps.coerceUndefined : opts.coerceUndefined;
    const coerceNull = typeof keyProps.coerceNull === 'boolean' ? keyProps.coerceNull : opts.coerceNull;

    let castedKeyValue;
    if (keyValue === undefined) {
      castedKeyValue = keyProps.default;
    } else if (typeof cast === 'function') {
      castedKeyValue = cast(keyValue, { coerceUndefined, coerceNull });
    } else {
      castedKeyValue = null;
    }

    config[key] = castedKeyValue;
    redacted[key] = keyProps.redact === true && castedKeyValue ? opts.redaction(castedKeyValue) : castedKeyValue;
  });

  return config;
};

module.exports = envConfigMap;
module.exports.defaultOptions = defaultOptions;
module.exports.types = types;
module.exports.utils = utils;
