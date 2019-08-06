const envConfigMap = require('../../index.js');

describe('envConfigMap', () => {
  describe('getOptions()', () => {
    test('should equal to default options when no options are provided', () => {
      const config = envConfigMap();
      expect(config.getOptions()).toMatchSnapshot();
    });
  });

  describe('when coerceUndefined option', () => {
    describe('is enabled for default type string', () => {
      test('"undefined" should equal to undefined', () => {
        process.env.FIXTURE = 'undefined';
        const configMap = {
          FIXTURE: {},
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toBeUndefined();
      });
    });

    describe('is disabled for default type string', () => {
      test('"undefined" should equal to "undefined"', () => {
        process.env.FIXTURE = 'undefined';
        const configMap = {
          FIXTURE: { coerceUndefined: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toStrictEqual('undefined');
      });
    });
  });

  describe('when coerceNull option', () => {
    describe('is enabled for type number', () => {
      test('"null" should equal to null', () => {
        process.env.FIXTURE = 'null';
        const configMap = {
          FIXTURE: { type: 'number' },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toBeNull();
      });

      test('"3" should equal to 3', () => {
        process.env.FIXTURE = '3';
        const configMap = {
          FIXTURE: { type: 'number' },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toStrictEqual(3);
      });
    });

    describe('is disabled for type number', () => {
      test('"null" should equal to undefined', () => {
        process.env.FIXTURE = 'null';
        const configMap = {
          FIXTURE: { type: 'number', coerceNull: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toBeUndefined();
      });

      test('"3" should equal to 3', () => {
        process.env.FIXTURE = '3';
        const configMap = {
          FIXTURE: { type: 'number', coerceNull: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toStrictEqual(3);
      });
    });
  });

  describe('sandbox test', () => {
    test('should equal expected output', () => {
      // set fixture values for sandbox example
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
          booleanYesNo: string => (string === 'yes' ? true : false),
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
