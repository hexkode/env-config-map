const types = require('../../src/types.js');

describe('types', () => {
  describe('string', () => {
    describe('is an identity function when', () => {
      it('receives empty string', () => {
        expect(types.string('')).toStrictEqual('');
      });

      it('receives spaces', () => {
        expect(types.string('   ')).toStrictEqual('   ');
      });

      it('receives padding string', () => {
        expect(types.string('   testValuePadded   ')).toStrictEqual('   testValuePadded   ');
      });

      it('receives string 0', () => {
        expect(types.string('0')).toStrictEqual('0');
      });

      it('receives string float', () => {
        expect(types.string('3.14')).toStrictEqual('3.14');
      });

      it('receives string integer > 0', () => {
        expect(types.string('12345')).toStrictEqual('12345');
      });

      it('receives string null', () => {
        expect(types.string('null')).toStrictEqual('null');
      });

      it('receives string undefined', () => {
        expect(types.string('undefined')).toStrictEqual('undefined');
      });
    });
  });

  describe('number', () => {
    it('returns integer for string 0', () => {
      expect(types.number('0')).toStrictEqual(0);
    });

    it('returns integer for string integer > 0', () => {
      expect(types.number('3')).toStrictEqual(3);
    });

    it('returns float for string float > 0', () => {
      expect(types.number('3.14')).toStrictEqual(3.14);
    });

    it('returns float for string float < 0', () => {
      expect(types.number('0.009')).toStrictEqual(0.009);
    });

    it('returns null for invalid number string', () => {
      expect(types.number('invalidNumberString')).toBeNull();
    });

    it('returns null for string null', () => {
      expect(types.number('null')).toBeNull();
    });

    it('returns null for string undefined', () => {
      expect(types.number('undefined')).toBeNull();
    });
  });

  describe('boolean', () => {
    it('returns true for string true', () => {
      expect(types.boolean('true')).toStrictEqual(true);
    });

    it('returns true for string 1', () => {
      expect(types.boolean('1')).toStrictEqual(true);
    });

    it('returns false for string false', () => {
      expect(types.boolean('false')).toStrictEqual(false);
    });

    it('returns false for string 0', () => {
      expect(types.boolean('0')).toStrictEqual(false);
    });

    it('returns true for string true that is padded and camel cased', () => {
      expect(types.boolean(' TrUe   ')).toStrictEqual(true);
    });

    it('returns null for non-boolean string', () => {
      expect(types.boolean('neTrue1False0')).toBeNull();
    });

    it('returns null for string null', () => {
      expect(types.boolean('null')).toBeNull();
    });

    it('returns null for string undefined', () => {
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
    });

    it('returns null for string null', () => {
      expect(types.object('null')).toBeNull();
    });

    it('returns null for string undefined', () => {
      expect(() => types.object('undefined')).toThrow();
    });
  });

  describe('arrayCommaDelim', () => {
    it('returns array for comma delimited string', () => {
      expect(types.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
    });

    it('returns array with item trimmed for comma delimited string', () => {
      expect(types.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
    });

    it('returns array for string null', () => {
      expect(types.arrayCommaDelim('null')).toStrictEqual(['null']);
    });

    it('returns array for string undefined', () => {
      expect(types.arrayCommaDelim('undefined')).toStrictEqual(['undefined']);
    });
  });
});
