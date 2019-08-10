const { cast, DEFAULT_REDACTED, redaction } = require('../../src/utils.js');
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
    test('any exception should return null', () => {
      expect(cast('{"invalid": json', types.object)).toBeNull();
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
});
