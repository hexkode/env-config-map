const envConfigMap = require('../../index.js');

describe('envConfigMap', () => {
  describe('getOptions()', () => {
    test('should equal to default options when no options are provided', () => {
      const config = envConfigMap();
      expect(config.getOptions()).toMatchSnapshot();
    });
  });

  describe('when getKeyValue()', () => {
    test('return undefined, should equal undefined', () => {
      const config = envConfigMap({ FIXTURE_KEY: {} }, { getKeyValue: () => undefined });
      expect(config.FIXTURE_KEY).toBeUndefined();
    });
    test('return null, should equal null', () => {
      process.env.FIXTURE_KEY = null;
      const config = envConfigMap({ FIXTURE_KEY: {} }, { getKeyValue: () => null });
      expect(config.FIXTURE_KEY).toBeNull();
    });
    test('return boolean, should equal null', () => {
      const config = envConfigMap({ FIXTURE_KEY: {} }, { getKeyValue: () => true });
      expect(config.FIXTURE_KEY).toBeNull();
    });
  });

  describe('when coerceUndefined option', () => {
    describe('is enabled for string type', () => {
      test('"undefined" should equal to undefined', () => {
        process.env.FIXTURE_KEY = 'undefined';
        const configMap = {
          FIXTURE_KEY: {},
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE_KEY).toBeUndefined();
      });
    });

    describe('is disabled for string type', () => {
      test('"undefined" should equal to "undefined"', () => {
        process.env.FIXTURE_KEY = 'undefined';
        const configMap = {
          FIXTURE_KEY: { coerceUndefined: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE_KEY).toStrictEqual('undefined');
      });
    });
  });

  describe('when coerceNull option', () => {
    describe('is enabled for number type', () => {
      test('"null" should equal to null', () => {
        process.env.FIXTURE_KEY = 'null';
        const configMap = {
          FIXTURE_KEY: { type: 'number' },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE_KEY).toBeNull();
      });

      test('"3" should equal to 3', () => {
        process.env.FIXTURE_KEY = '3';
        const configMap = {
          FIXTURE_KEY: { type: 'number' },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE_KEY).toStrictEqual(3);
      });
    });

    describe('is disabled for number type', () => {
      test('"null" should equal to null', () => {
        process.env.FIXTURE_KEY = 'null';
        const configMap = {
          FIXTURE_KEY: { type: 'number', coerceNull: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE_KEY).toBeNull();
      });

      test('"3" should equal to 3', () => {
        process.env.FIXTURE_KEY = '3';
        const configMap = {
          FIXTURE_KEY: { type: 'number', coerceNull: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE_KEY).toStrictEqual(3);
      });
    });
  });

  describe('sandbox test', () => {
    test('should equal expected output', () => {
      // set fixture_KEY values for sandbox example
      process.env.NODE_ENV = 'test';
      process.env.SERVER_PORT = '8080';
      process.env.ENABLE_CORS = 'true';
      process.env.DB_PASSWORD = 'mypassword';
      process.env.DB_ENABLE_PROFILER = 'yes';
      process.env.EXAMPLE_OBJECT = '{ "retry": 3, "timeout": 1000 } ';
      process.env.EXAMPLE_OBJECT_INVALID = '{ "retry": 3, "timeout": 1000 ';
      process.env.EXAMPLE_ARRAY = '[ "a", 1 ]';
      process.env.EXAMPLE_ARRAY_COMMA_DELIM = 'id,email,   dateCreated   ,dateModified';
      process.env.NOT_IN_CONFIG_MAP = 'not mapped';
      process.env.INVALID_TYPE = 'passthru          ';
      process.env.COERCE_UNDEFINED = 'undefined';
      process.env.COERCE_NULL = 'null';
      process.env.COERCE_NULL_DISABLED = 'null';

      // define config map
      const configMap = {
        NODE_ENV: { default: 'development' },
        LOG_LEVEL: { default: 'info' },
        SERVER_HOST: {},
        SERVER_PORT: { default: 80, type: 'number' },
        ENABLE_CORS: { default: false, type: 'boolean' },
        DB_PASSWORD: { redact: true },
        DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
        EXAMPLE_OBJECT: { type: 'object' },
        EXAMPLE_OBJECT_INVALID: { type: 'object' },
        EXAMPLE_ARRAY: { type: 'object' },
        EXAMPLE_ARRAY_COMMA_DELIM: { type: 'arrayCommaDelim' },
        INVALID_TYPE: { type: 'typeNotDefined' },
        COERCE_UNDEFINED: {},
        COERCE_NULL: {},
        COERCE_NULL_DISABLED: { coerceNull: false },
      };

      // customize with options
      const options = {
        types: {
          booleanYesNo: value => value === 'yes',
        },
        redaction: value => value.replace(/.+/, 'XXXXXXXXXX'),
      };

      // map env vars to config using envConfigMap
      const config = envConfigMap(configMap, options);

      expect(config).toMatchSnapshot();
      expect(config.getRedacted()).toMatchSnapshot();
    });
  });
});
