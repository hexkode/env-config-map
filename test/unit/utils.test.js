const {
  convert,
  DEFAULT_REDACTED,
  redactor,
  getter,
  coerceUndefinedString,
  coerceNullString,
  lowerTrim,
} = require('../../src/utils.js');

describe('utils', () => {
  describe('redactor', () => {
    test(`should equal to "${DEFAULT_REDACTED}"`, () => {
      expect(redactor('mypassword')).toStrictEqual(DEFAULT_REDACTED);
    });
  });

  describe('getter', () => {
    test('TEST_KEY should equal to "testValue"', () => {
      process.env.TEST_KEY = 'testValue';
      expect(getter('TEST_KEY')).toStrictEqual('testValue');
    });
    test('MISSING_KEY should equal to undefined', () => {
      expect(getter('MISSING_KEY')).toBeUndefined();
    });
  });

  describe('convert', () => {
    test('when cast is not a function it should return "testValue"', () => {
      expect(convert('testValue', 'notFunction')).toStrictEqual('testValue');
    });
    test('when not string, null or undefined it should return null', () => {
      expect(convert(true)).toBeNull();
      expect(convert(123)).toBeNull();
      expect(convert([])).toBeNull();
      expect(convert({})).toBeNull();
    });
    test('null should return null', () => {
      expect(convert(null)).toBeNull();
    });
    test('undefined should return undefined', () => {
      expect(convert(undefined)).toBeUndefined();
    });
    test('when coerceNull is enabled, "null" should return null', () => {
      expect(convert('null')).toBeNull();
    });
    test('when coerceUndefined is enabled, "undefined" should return undefined', () => {
      expect(convert('undefined')).toBeUndefined();
    });
    test('when coerceNull is disabled, "null" should return "null"', () => {
      expect(convert('null', stringValue => stringValue, { coerceNull: false })).toStrictEqual('null');
    });
    test('when coerceUndefined is disabled, "undefined" should return "undefined"', () => {
      expect(convert('undefined', stringValue => stringValue, { coerceUndefined: false })).toStrictEqual('undefined');
    });
  });

  describe('coerceNullString', () => {
    test('"null" should return true', () => {
      expect(coerceNullString('null')).toStrictEqual(true);
    });
    test('"testValue" should return false', () => {
      expect(coerceNullString('testValue')).toStrictEqual(false);
    });
  });

  describe('coerceUndefinedString', () => {
    test('"undefined" should equal to true', () => {
      expect(coerceUndefinedString('undefined')).toStrictEqual(true);
    });
    test('"testValue" should equal to false', () => {
      expect(coerceUndefinedString('testValue')).toStrictEqual(false);
    });
  });

  describe('lowerTrim', () => {
    test('"testValue" should equal to "testValue"', () => {
      expect(lowerTrim('testValue')).toStrictEqual('testvalue');
    });
    test('" TrUe   " should equal to "true"', () => {
      expect(lowerTrim(' TrUe   ')).toStrictEqual('true');
    });
    test('[] should equal to ""', () => {
      expect(lowerTrim([])).toStrictEqual('');
    });
  });
});
