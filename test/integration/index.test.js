const envConfigMap = require('../../index.js');

describe('envConfigMap', () => {
  describe('getOptions()', () => {
    it('returns default options when no options are provided', () => {
      const config = envConfigMap();
      expect(config.getOptions()).toMatchSnapshot();
    });
  });

  describe('getter() that are customized to return types that are not string', () => {
    it('returns undefined for undefined', () => {
      const config = envConfigMap({ FIXTURE_KEY: {} }, { getter: () => undefined });
      expect(config.FIXTURE_KEY).toBeUndefined();
    });
    it('returns null for null', () => {
      process.env.FIXTURE_KEY = null;
      const config = envConfigMap({ FIXTURE_KEY: {} }, { getter: () => null });
      expect(config.FIXTURE_KEY).toBeNull();
    });
    it('return null for any other types', () => {
      const configBool = envConfigMap({ FIXTURE_KEY: {} }, { getter: () => true });
      expect(configBool.FIXTURE_KEY).toBeNull();

      const configArray = envConfigMap({ FIXTURE_KEY: {} }, { getter: () => [] });
      expect(configArray.FIXTURE_KEY).toBeNull();

      const configNumber = envConfigMap({ FIXTURE_KEY: {} }, { getter: () => 123 });
      expect(configNumber.FIXTURE_KEY).toBeNull();
    });
  });

  describe('coerceUndefined option', () => {
    describe('is enabled with type string', () => {
      it('returns undefined for "undefined"', () => {
        process.env.FIXTURE_KEY = 'undefined';
        const configMap = { FIXTURE_KEY: {} };
        const config = envConfigMap(configMap);
        expect(config.FIXTURE_KEY).toBeUndefined();
      });
    });

    describe('is disabled with type string', () => {
      it('returns "undefined" for "undefined"', () => {
        process.env.FIXTURE_KEY = 'undefined';
        const configMap = { FIXTURE_KEY: { coerceUndefined: false } };
        const config = envConfigMap(configMap);
        expect(config.FIXTURE_KEY).toStrictEqual('undefined');
      });
    });
  });

  describe('coerceNull option', () => {
    describe('is enabled with type number', () => {
      it('returns null for "null"', () => {
        process.env.FIXTURE_KEY = 'null';
        const configMap = { FIXTURE_KEY: { type: 'number' } };
        const config = envConfigMap(configMap);
        expect(config.FIXTURE_KEY).toBeNull();
      });

      it('returns 3 for "3"', () => {
        process.env.FIXTURE_KEY = '3';
        const configMap = { FIXTURE_KEY: { type: 'number' } };
        const config = envConfigMap(configMap);
        expect(config.FIXTURE_KEY).toStrictEqual(3);
      });
    });

    describe('is disabled with number type', () => {
      it('returns null for "null"', () => {
        process.env.FIXTURE_KEY = 'null';
        const configMap = { FIXTURE_KEY: { type: 'number', coerceNull: false } };
        const config = envConfigMap(configMap);
        expect(config.FIXTURE_KEY).toBeNull();
      });

      it('returns 3 for "3"', () => {
        process.env.FIXTURE_KEY = '3';
        const configMap = { FIXTURE_KEY: { type: 'number', coerceNull: false } };
        const config = envConfigMap(configMap);
        expect(config.FIXTURE_KEY).toStrictEqual(3);
      });
    });
  });

  describe('sandbox example', () => {
    it('returns expected output', () => {
      // set fixture values for sandbox example
      process.env.NODE_ENV = 'test';
      process.env.SERVER_PORT = '8080';
      process.env.ENABLE_CORS = 'true';
      process.env.DB_PASSWORD = 'mypassword';
      process.env.DB_ENABLE_PROFILER = 'YES';
      process.env.EXAMPLE_OBJECT = '{ "retry": 3, "timeout": 1000 } ';
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
          // define custom type "booleanYesNo"
          booleanYesNo: (str) => {
            const normalized = envConfigMap.utils.lowerTrim(str);
            if (normalized === 'yes') return true;
            if (normalized === 'no') return false;
            return null;
          },
        },
        redactor: (str) => str.replace(/.+/, 'XXXXXXXXXX'),
      };

      // map env vars to config using envConfigMap
      const config = envConfigMap(configMap, options);

      expect(config).toMatchSnapshot();
      expect(config.getRedacted()).toMatchSnapshot();
    });
  });
});
