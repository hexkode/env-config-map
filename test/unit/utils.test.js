const {
  convertString, DEFAULT_REDACTED, redaction, getKeyValue, coerce, lowerTrim,
} = require('../../src/utils.js');

describe('utils', () => {
  describe('redaction', () => {
    test(`should equal to "${DEFAULT_REDACTED}"`, () => {
      expect(redaction('mypassword')).toStrictEqual(DEFAULT_REDACTED);
    });
  });
  describe('convertString', () => {
    test('when convert is not a function it should return "testMixedValue"', () => {
      expect(convertString('testMixedValue', 'notFunction')).toStrictEqual('testMixedValue');
    });
    test('when mixedValue is not string, null or undefined it should return null', () => {
      expect(convertString(true)).toBeNull();
      expect(convertString(123)).toBeNull();
      expect(convertString([])).toBeNull();
      expect(convertString({})).toBeNull();
    });
    test('when mixedValue is null it should return null', () => {
      expect(convertString(null)).toBeNull();
    });
    test('when mixedValue is undefined it should return undefined', () => {
      expect(convertString(undefined)).toBeUndefined();
    });
    test('when coerceNull is enabled, mixedValue "null" should return null', () => {
      expect(convertString('null')).toBeNull();
    });
    test('when coerceUndefined is enabled, mixedValue "undefined" should return undefined', () => {
      expect(convertString('undefined')).toBeUndefined();
    });
    test('when coerceNull is disabled, mixedValue "null" should return "null"', () => {
      expect(convertString('null', stringValue => stringValue, { coerceNull: false })).toStrictEqual('null');
    });
    test('when coerceUndefined is disabled, mixedValue "undefined" should return "undefined"', () => {
      expect(convertString('undefined', stringValue => stringValue, { coerceUndefined: false })).toStrictEqual(
        'undefined',
      );
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
