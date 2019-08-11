const types = require('./types.js');
const utils = require('./utils.js');

const defaultOptions = {
  types,
  getter: utils.getter,
  redactor: utils.redactor,
  coerceUndefined: true,
  coerceNull: true,
};

/**
 * Maps value returned from opts.getter() to config object using configMap.
 * Also generates a redacted version of the config object for logging.
 *
 * @param {Object} configMap
 * @param {Object} options
 * @returns {Object}
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
    const props = configMap[key];
    const value = opts.getter(key);
    const type = props.type || 'string';
    const cast = opts.types[type];
    const coerceUndefined = typeof props.coerceUndefined === 'boolean' ? props.coerceUndefined : opts.coerceUndefined;
    const coerceNull = typeof props.coerceNull === 'boolean' ? props.coerceNull : opts.coerceNull;

    let converted;
    if (value === undefined) {
      converted = props.default;
    } else {
      converted = utils.convert(value, cast, { coerceUndefined, coerceNull });
    }

    config[key] = converted;
    redacted[key] = props.redact === true && converted ? opts.redactor(converted) : converted;
  });

  return config;
};

module.exports = envConfigMap;
module.exports.defaultOptions = defaultOptions;
module.exports.types = types;
module.exports.utils = utils;
