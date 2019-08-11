const {
  castString,
  DEFAULT_REDACTED,
  redaction,
  getKeyValue,
  coerceUndefinedString,
  coerceNullString,
  lowerTrim,
} = require('../../src/utils.js');

describe('utils', () => {
  describe('redaction', () => {
    test(`should equal to "${DEFAULT_REDACTED}"`, () => {
      expect(redaction('mypassword')).toStrictEqual(DEFAULT_REDACTED);
    });
  });
  describe('getKeyValue', () => {
    test('FIXTURE_KEY should equal to "testStringValue"', () => {
      process.env.FIXTURE_KEY = 'testStringValue';
      expect(getKeyValue('FIXTURE_KEY')).toStrictEqual('testStringValue');
    });
    test('MISSING_KEY should equal to undefined', () => {
      expect(getKeyValue('MISSING_KEY')).toBeUndefined();
    });
  });
  describe('castString', () => {
    test('when cast is not a function it should return "testMixedValue"', () => {
      expect(castString('testMixedValue', 'notFunction')).toStrictEqual('testMixedValue');
    });
    test('when mixedValue is not string, null or undefined it should return null', () => {
      expect(castString(true)).toBeNull();
      expect(castString(123)).toBeNull();
      expect(castString([])).toBeNull();
      expect(castString({})).toBeNull();
    });
    test('when mixedValue is null it should return null', () => {
      expect(castString(null)).toBeNull();
    });
    test('when mixedValue is undefined it should return undefined', () => {
      expect(castString(undefined)).toBeUndefined();
    });
    test('when coerceNull is enabled, mixedValue "null" should return null', () => {
      expect(castString('null')).toBeNull();
    });
    test('when coerceUndefined is enabled, mixedValue "undefined" should return undefined', () => {
      expect(castString('undefined')).toBeUndefined();
    });
    test('when coerceNull is disabled, mixedValue "null" should return "null"', () => {
      expect(castString('null', stringValue => stringValue, { coerceNull: false })).toStrictEqual('null');
    });
    test('when coerceUndefined is disabled, mixedValue "undefined" should return "undefined"', () => {
      expect(castString('undefined', stringValue => stringValue, { coerceUndefined: false })).toStrictEqual(
        'undefined',
      );
    });
  });
  describe('coerceNullString', () => {
    test('"null" should equal to true', () => {
      expect(coerceNullString('null')).toStrictEqual(true);
    });
    test('"testStringValue" should equal to false', () => {
      expect(coerceNullString('testStringValue')).toStrictEqual(false);
    });
  });
  describe('coerceUndefinedString', () => {
    test('"undefined" should equal to true', () => {
      expect(coerceUndefinedString('undefined')).toStrictEqual(true);
    });
    test('"testStringValue" should equal to false', () => {
      expect(coerceUndefinedString('testStringValue')).toStrictEqual(false);
    });
  });
  describe('lowerTrim', () => {
    test('"teststringvalue" should equal to "teststringvalue"', () => {
      expect(lowerTrim('teststringvalue')).toStrictEqual('teststringvalue');
    });
    test('" TrUe   " should equal to "true"', () => {
      expect(lowerTrim(' TrUe   ')).toStrictEqual('true');
    });
    test('[] should equal to ""', () => {
      expect(lowerTrim([])).toStrictEqual('');
    });
  });
});
