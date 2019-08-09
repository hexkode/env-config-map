const {
  coerce, cast, getEnv, DEFAULT_REDACTED, redaction,
} = require('../../src/utils.js');
const types = require('../../src/types.js');

describe('utils', () => {
  describe('redaction', () => {
    test(`should equal to "${DEFAULT_REDACTED}"`, () => {
      const redacted = redaction('mypassword');
      expect(redacted).toStrictEqual(DEFAULT_REDACTED);
    });
  });
  describe('cast', () => {
    test('matching typePassthru should passthru', () => {
      const result = cast(true, types.boolean, { typePassthru: 'boolean' });
      expect(result).toStrictEqual(true);
    });
    test('non-matching typePassthru should be undefined', () => {
      const result = cast(true, types.string, { typePassthru: 'string' });
      expect(result).toBeUndefined();
    });
    test('non-string with no typePassthru should be undefined', () => {
      const result = cast(true, types.string);
      expect(result).toBeUndefined();
    });
  });
});
