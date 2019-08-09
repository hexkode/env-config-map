const types = require('../../src/types.js');

describe('types', () => {
  describe('string', () => {
    test('"" to equal ""', () => {
      expect(types.string('')).toStrictEqual('');
    });

    test('"   " to equal "   "', () => {
      expect(types.string('   ')).toStrictEqual('   ');
    });

    test('"stringTest" to equal "stringTest"', () => {
      expect(types.string('stringTest')).toStrictEqual('stringTest');
    });

    test('"   stringTest   " to equal "   stringTest   "', () => {
      expect(types.string('   stringTest   ')).toStrictEqual('   stringTest   ');
    });

    test('"0" to equal "0"', () => {
      expect(types.string('0')).toStrictEqual('0');
    });

    test('"3.14" to equal "3.14"', () => {
      expect(types.string('3.14')).toStrictEqual('3.14');
    });

    test('"12345" to equal "12345"', () => {
      expect(types.string('12345')).toStrictEqual('12345');
    });
  });

  describe('number', () => {
    test('"0" to equal 0', () => {
      expect(types.number('0')).toStrictEqual(0);
    });

    test('"3" to equal 3', () => {
      expect(types.number('3')).toStrictEqual(3);
    });

    test('"3.14" to equal 3.14', () => {
      expect(types.number('3.14')).toStrictEqual(3.14);
    });

    test('"0.009" to equal 0.009', () => {
      expect(types.number('0.009')).toStrictEqual(0.009);
    });

    test('"invalidNumberString" to equal undefined', () => {
      expect(types.number('invalidNumberString')).toBeUndefined();
    });
  });

  describe('boolean', () => {
    test('"true" to equal true', () => {
      expect(types.boolean('true')).toStrictEqual(true);
    });

    test('"1" to equal true', () => {
      expect(types.boolean('1')).toStrictEqual(true);
    });

    test('"false" to equal false', () => {
      expect(types.boolean('false')).toStrictEqual(false);
    });

    test('"0" to equal false', () => {
      expect(types.boolean('0')).toStrictEqual(false);
    });

    test('"neTrue1False0" to equal undefined', () => {
      expect(types.boolean('neTrue1False0')).toBeUndefined();
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

    test('stringify object to equal object', () => {
      expect(types.object('{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }')).toStrictEqual(objectFixture);
    });

    test('invalid json string to throw exception', () => {
      expect(() => types.object('{ "a": 1')).toThrow();
    });
  });

  describe('arrayCommaDelim', () => {
    test('"a,b,c" to equal [a,b,c]', () => {
      expect(types.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
    });

    test('" a ,  b   , c " to equal [a,b,c]', () => {
      expect(types.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
    });
  });
});
