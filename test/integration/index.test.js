const envConfigMap = require('../../index.js');

describe('integration test', () => {
  describe('getOptions()', () => {
    test('should equal to default options when no options are provided', () => {
      const config = envConfigMap();
      expect(config.getOptions()).toMatchSnapshot();
    });
  });

  describe('baseline', () => {
    test('should equal expected output', () => {
      process.env.NODE_ENV = 'test';
      process.env.SERVER_PORT = '8080';
      process.env.ENABLE_CORS = 'true';
      process.env.DB_PASSWORD = 'mypassword';
      process.env.DB_ENABLE_PROFILER = 'yes';
      process.env.EXAMPLE_OBJECT = '{ "retry": 3, "timeout": 1000 } ';
      process.env.EXAMPLE_ARRAY = '[ "a", 1 ]';
      process.env.EXAMPLE_ARRAY_COMMA_DELIM = 'id,email,   dateCreated   ,dateModified';
      process.env.NOT_IN_CONFIG_MAP = 'not mapped';
      process.env.MISSING_TYPE_TRANSFORM = 'pass thru          ';

      const configMap = {
        NODE_ENV: { default: 'development' },
        LOG_LEVEL: { default: 'info' },
        SERVER_HOST: {},
        SERVER_PORT: { default: 80, type: 'number' },
        ENABLE_CORS: { default: false, type: 'boolean' },
        DB_PASSWORD: { isSecret: true },
        DB_ENABLE_PROFILER: { default: false, type: 'booleanYesNo' },
        EXAMPLE_OBJECT: { type: 'object' },
        EXAMPLE_ARRAY: { type: 'object' },
        EXAMPLE_ARRAY_COMMA_DELIM: { type: 'arrayCommaDelim' },
        MISSING_TYPE_TRANSFORM: { type: 'typeNotDefined' },
      };

      const options = {
        redactedString: 'XXXXXXXXXX',
        typeTransform: {
          booleanYesNo: string => (string === 'yes' ? true : false),
        },
      };

      const config = envConfigMap(configMap, options);

      expect(config).toMatchSnapshot();
      expect(config.getRedacted()).toMatchSnapshot();
    });
  });
});
