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
    it('returns the redacted string', () => {
      expect(redactor('mypassword')).toStrictEqual(DEFAULT_REDACTED);
    });
  });

  describe('getter', () => {
    it('returns value if key exist', () => {
      process.env.TEST_KEY = 'testValue';
      expect(getter('TEST_KEY')).toStrictEqual('testValue');
    });
    it('returns undefined if key does not exist', () => {
      expect(getter('MISSING_KEY')).toBeUndefined();
    });
  });

  describe('convert', () => {
    it('returns same string when cast is not a function', () => {
      expect(convert('testValue', 'notFunction')).toStrictEqual('testValue');
    });
    it('returns null when type is not string', () => {
      expect(convert(true)).toBeNull();
      expect(convert(123)).toBeNull();
      expect(convert([])).toBeNull();
      expect(convert({})).toBeNull();
    });
    it('returns null for null', () => {
      expect(convert(null)).toBeNull();
    });
    it('returns undefined for undefined', () => {
      expect(convert(undefined)).toBeUndefined();
    });
    it('returns null for string null when coerceNull is enabled', () => {
      expect(convert('null')).toBeNull();
    });
    it('returns undefined for string undefined when coerceUndefined is enabled', () => {
      expect(convert('undefined')).toBeUndefined();
    });
    it('returns string null for string null when coerceNull is disabled', () => {
      expect(convert('null', str => str, { coerceNull: false })).toStrictEqual('null');
    });
    it('returns string undefined for string undefined when coerceUndefined is disabled', () => {
      expect(convert('undefined', str => str, { coerceUndefined: false })).toStrictEqual('undefined');
    });
  });

  describe('coerceNullString', () => {
    it('returns true for string null', () => {
      expect(coerceNullString('null')).toStrictEqual(true);
    });
    it('returns false for string not equal to null', () => {
      expect(coerceNullString('testValue')).toStrictEqual(false);
    });
  });

  describe('coerceUndefinedString', () => {
    it('returns true for string undefined', () => {
      expect(coerceUndefinedString('undefined')).toStrictEqual(true);
    });
    it('returns false for string not euqal to undefined', () => {
      expect(coerceUndefinedString('testValue')).toStrictEqual(false);
    });
  });

  describe('lowerTrim', () => {
    it('returns string all lower cased', () => {
      expect(lowerTrim('testValue')).toStrictEqual('testvalue');
    });
    it('returns string trimmed and lower cased', () => {
      expect(lowerTrim(' TrUe   ')).toStrictEqual('true');
    });
    it('returns empty string when type is not string', () => {
      expect(lowerTrim([])).toStrictEqual('');
      expect(lowerTrim(null)).toStrictEqual('');
      expect(lowerTrim(123)).toStrictEqual('');
    });
  });
});
