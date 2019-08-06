const envConfigMap = require('../../index.js');

describe('envConfigMap', () => {
  describe('getOptions()', () => {
    test('should equal to default options when no options are provided', () => {
      const config = envConfigMap();
      expect(config.getOptions()).toMatchSnapshot();
    });
  });

  describe('when nullPasthru option', () => {
    describe('is enabled', () => {
      test('"null" should equal to null', () => {
        process.env.FIXTURE = 'null';
        const configMap = {
          FIXTURE: {},
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toBeNull();
      });
    });

    describe('is disabled', () => {
      test('"null" should equal to "null', () => {
        process.env.FIXTURE = 'null';
        const configMap = {
          FIXTURE: { nullPassthru: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toStrictEqual('null');
      });
    });
  });

  describe('when undefinedPasthru option', () => {
    describe('is enabled', () => {
      test('"undefined" should equal to undefined', () => {
        process.env.FIXTURE = 'undefined';
        const configMap = {
          FIXTURE: {},
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toBeUndefined();
      });
    });

    describe('is disabled', () => {
      test('"undefined" should equal to "undefined"', () => {
        process.env.FIXTURE = 'undefined';
        const configMap = {
          FIXTURE: { undefinedPassthru: false },
        };

        const config = envConfigMap(configMap);

        expect(config.FIXTURE).toStrictEqual('undefined');
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
      process.env.MISSING_TYPE_TRANSFORM = 'passthru          ';
      process.env.UNDEFINED_PASSTHRU = 'undefined';
      process.env.NULL_PASSTHRU = 'null';
      process.env.NULL_PASSTHRU_DISALBED = 'null';

      // define config map
      const configMap = {
        NODE_ENV: { default: 'development' },
        LOG_LEVEL: { default: 'info' },
        SERVER_HOST: {},
        SERVER_PORT: { default: 80, type: 'number' },
        ENABLE_CORS: { default: false, type: 'boolean' },
        DB_PASSWORD: { isSecret: true },
        DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
        EXAMPLE_OBJECT: { type: 'object' },
        EXAMPLE_OBJECT_INVALID: { type: 'object' },
        EXAMPLE_ARRAY: { type: 'object' },
        EXAMPLE_ARRAY_COMMA_DELIM: { type: 'arrayCommaDelim' },
        MISSING_TYPE_TRANSFORM: { type: 'typeNotDefined' },
        UNDEFINED_PASSTHRU: {},
        NULL_PASSTHRU: {},
        NULL_PASSTHRU_DISALBED: { nullPassthru: false },
      };

      // customize with options
      const options = {
        redactedString: 'XXXXXXXXXX',
        typeTransform: {
          booleanYesNo: string => (string === 'yes' ? true : false),
        },
      };

      // map env vars to config using envConfigMap
      const config = envConfigMap(configMap, options);

      expect(config).toMatchSnapshot();
      expect(config.getRedacted()).toMatchSnapshot();
    });
  });
});
