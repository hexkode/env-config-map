const types = require('../../src/types.js');

describe('types', () => {
  describe('string', () => {
    it('returns input', () => {
      expect(types.string('')).toStrictEqual('');
      expect(types.string('   ')).toStrictEqual('   ');
      expect(types.string('   testValuePadded   ')).toStrictEqual('   testValuePadded   ');
      expect(types.string('0')).toStrictEqual('0');
      expect(types.string('3.14')).toStrictEqual('3.14');
      expect(types.string('12345')).toStrictEqual('12345');
      expect(types.string('null')).toStrictEqual('null');
      expect(types.string('undefined')).toStrictEqual('undefined');
    });
  });

  describe('number', () => {
    it('returns integer for integer string', () => {
      expect(types.number('0')).toStrictEqual(0);
      expect(types.number('3')).toStrictEqual(3);
    });

    it('returns float for float string', () => {
      expect(types.number('3.14')).toStrictEqual(3.14);
      expect(types.number('0.009')).toStrictEqual(0.009);
    });

    it('returns null for strings that are not numeric', () => {
      expect(types.number('invalidNumberString')).toBeNull();
      expect(types.number('null')).toBeNull();
      expect(types.number('undefined')).toBeNull();
    });
  });

  describe('boolean', () => {
    it('returns true for case insensitive "true" and "1"', () => {
      expect(types.boolean('true')).toStrictEqual(true);
      expect(types.boolean('1')).toStrictEqual(true);
      expect(types.boolean(' TrUe   ')).toStrictEqual(true);
    });

    it('returns false for case insensitive "false" and "0"', () => {
      expect(types.boolean('false')).toStrictEqual(false);
      expect(types.boolean('0')).toStrictEqual(false);
      expect(types.boolean('FALSE')).toStrictEqual(false);
    });

    it('returns null for strings that are not boolean like', () => {
      expect(types.boolean('neTrue1False0')).toBeNull();
      expect(types.boolean('null')).toBeNull();
      expect(types.boolean('undefined')).toBeNull();
    });
  });

  describe('object', () => {
    const objectFixture = {
      a: 1,
      b: 'str1',
      c: [],
      d: true,
      e: {
        f: [2, 3, 'str2'],
      },
    };

    it('returns object for valid stringify object', () => {
      expect(types.object('{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }')).toStrictEqual(
        objectFixture,
      );
    });

    it('throws exception for invalid stringify object', () => {
      expect(() => types.object('{ "a": 1')).toThrow();
      expect(() => types.object('undefined')).toThrow();
    });

    it('returns null for "null"', () => {
      expect(types.object('null')).toBeNull();
    });
  });

  describe('arrayCommaDelim', () => {
    it('returns array for comma delimited string', () => {
      expect(types.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
    });

    it('returns array with all items trimmed', () => {
      expect(types.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
    });

    it('returns array with length of 1 for any one word string', () => {
      expect(types.arrayCommaDelim('null')).toStrictEqual(['null']);
      expect(types.arrayCommaDelim('undefined')).toStrictEqual(['undefined']);
    });
  });
});
