const {
  cast, DEFAULT_REDACTED, redaction, getEnv, coerce,
} = require('../../src/utils.js');
const types = require('../../src/types.js');

describe('utils', () => {
  describe('redaction', () => {
    test(`should equal to "${DEFAULT_REDACTED}"`, () => {
      expect(redaction('mypassword')).toStrictEqual(DEFAULT_REDACTED);
    });
  });
  describe('cast', () => {
    test('when caster is not a function it should return stringValue', () => {
      expect(cast('testStringValue', 'notFunction')).toStrictEqual('testStringValue');
    });
    test('when stringValue is not string, null or undefined it should return null', () => {
      expect(cast(true)).toBeNull();
      expect(cast(123)).toBeNull();
      expect(cast([])).toBeNull();
      expect(cast({})).toBeNull();
    });
    test('when stringValue is null it should return null', () => {
      expect(cast(null)).toBeNull();
    });
    test('when stringValue is undefined it should return undefined', () => {
      expect(cast(undefined)).toBeUndefined();
    });
    test('when coerceNull is enabled, stringValue "null" should return null', () => {
      expect(cast('null', types.string)).toBeNull();
    });
    test('when coerceUndefined is enabled, stringValue "undefined" should return undefined', () => {
      expect(cast('undefined', types.string)).toBeUndefined();
    });
    test('when coerceNull is disabled, stringValue "null" should return "null"', () => {
      expect(cast('null', types.string, { coerceNull: false })).toStrictEqual('null');
    });
    test('when coerceUndefined is disabled, stringValue "undefined" should return "undefined"', () => {
      expect(cast('undefined', types.string, { coerceUndefined: false })).toStrictEqual('undefined');
    });
  });
  describe('getEnv', () => {
    test('FIXTURE_KEY should equal to "testStringValue"', () => {
      process.env.FIXTURE_KEY = 'testStringValue';
      expect(getEnv('FIXTURE_KEY')).toStrictEqual('testStringValue');
    });
    test('MISSING_KEY should equal to undefined', () => {
      expect(getEnv('MISSING_KEY')).toBeUndefined();
    });
  });
  describe('coerce.null', () => {
    test('"null" should equal to null', () => {
      expect(coerce.null('null')).toBeNull();
    });
    test('"testStringValue" should equal to "testStringValue"', () => {
      expect(coerce.null('testStringValue')).toStrictEqual('testStringValue');
    });
  });
  describe('coerce.undefined', () => {
    test('"undefined" should equal to undefined', () => {
      expect(coerce.undefined('undefined')).toBeUndefined();
    });
    test('"testStringValue" should equal to "testStringValue"', () => {
      expect(coerce.undefined('testStringValue')).toStrictEqual('testStringValue');
    });
  });
});
