const { cast, DEFAULT_REDACTED, redaction } = require('../../src/utils.js');
const types = require('../../src/types.js');

describe('utils', () => {
  describe('redaction', () => {
    test(`should equal to "${DEFAULT_REDACTED}"`, () => {
      const redacted = redaction('mypassword');
      expect(redacted).toStrictEqual(DEFAULT_REDACTED);
    });
  });
  describe('cast', () => {
    test('matching coerce passthru should passthru', () => {
      const result = cast(true, types.boolean);
      expect(result).toStrictEqual(true);
    });
    test('non-matching coerce passthru should be undefined', () => {
      const result = cast(true, types.string);
      expect(result).toBeUndefined();
    });
    test('non-string should be undefined', () => {
      const result = cast(true, types.string);
      expect(result).toBeUndefined();
    });
    test('null should be null', () => {
      const result = cast(null, types.string);
      expect(result).toBeNull();
    });
    test('undefined should be undefined', () => {
      const result = cast(undefined, types.string);
      expect(result).toBeUndefined();
    });
  });
});
