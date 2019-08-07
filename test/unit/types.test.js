const types = require('../../src/types.js');

describe('type', () => {
  describe('string', () => {
    test('"" to equal ""', () => {
      expect(types.string('')).toStrictEqual('');
    });

    test('"   " to equal ""', () => {
      expect(types.string('   ')).toStrictEqual('');
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

    test('"   12345   " to equal "12345"', () => {
      expect(types.string('   12345   ')).toStrictEqual('12345');
    });

    test('"stringTest" to equal "stringTest"', () => {
      expect(types.string('stringTest')).toStrictEqual('stringTest');
    });

    test('"   stringTestTrim   " to equal "stringTestTrim"', () => {
      expect(types.string('   stringTestTrim   ')).toStrictEqual('stringTestTrim');
    });

    test('undefined to equal undefined', () => {
      expect(types.string(undefined)).toBeUndefined();
    });

    test('null to equal null', () => {
      expect(types.string(null)).toBeNull();
    });
  });

  describe('number', () => {
    test('0 to equal 0', () => {
      expect(types.number(0)).toStrictEqual(0);
    });

    test('3 to equal 3', () => {
      expect(types.number(3)).toStrictEqual(3);
    });

    test('3.14 to equal 3.14', () => {
      expect(types.number(3.14)).toStrictEqual(3.14);
    });

    test('0.009 to equal 0.009', () => {
      expect(types.number(0.009)).toStrictEqual(0.009);
    });

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

    test('undefined to equal undefined', () => {
      expect(types.number(undefined)).toBeUndefined();
    });

    test('null to equal null', () => {
      expect(types.number(null)).toBeNull();
    });
  });

  describe('boolean', () => {
    test('true to equal true', () => {
      expect(types.boolean(true)).toStrictEqual(true);
    });

    test('false to equal false', () => {
      expect(types.boolean(false)).toStrictEqual(false);
    });

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

    test('undefined to equal undefined', () => {
      expect(types.boolean(undefined)).toBeUndefined();
    });

    test('null to equal null', () => {
      expect(types.boolean(null)).toBeNull();
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

    test('object to equal object', () => {
      expect(types.object(objectFixture)).toStrictEqual(objectFixture);
    });

    test('stringify object to equal object', () => {
      expect(types.object('{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }')).toStrictEqual(
        objectFixture,
      );
    });

    test('invalid json string to equal undefined', () => {
      expect(types.object('{ "a": 1')).toBeUndefined();
    });

    test('undefined to equal undefined', () => {
      expect(types.object(undefined)).toBeUndefined();
    });

    test('null to equal null', () => {
      expect(types.object(null)).toBeNull();
    });
  });

  describe('arrayCommaDelim', () => {
    test('"a,b,c" to equal [a,b,c]', () => {
      expect(types.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
    });

    test('" a ,  b   , c " to equal [a,b,c]', () => {
      expect(types.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
    });

    test('undefined to equal undefined', () => {
      expect(types.arrayCommaDelim(undefined)).toBeUndefined();
    });

    test('null to equal null', () => {
      expect(types.arrayCommaDelim(null)).toBeNull();
    });
  });

  describe('normalize', () => {
    test('{} to equal undefined', () => {
      expect(types.normalize({})).toBeUndefined();
    });

    test('[] to equal undefined', () => {
      expect(types.normalize([])).toBeUndefined();
    });

    test('true to equal undefined', () => {
      expect(types.normalize(true)).toBeUndefined();
    });

    test('undefined to equal undefined', () => {
      expect(types.normalize(undefined)).toBeUndefined();
    });

    test('null to equal null', () => {
      expect(types.normalize(null)).toBeNull();
    });

    test('"" to equal undefined', () => {
      expect(types.normalize('')).toBeUndefined();
    });

    test('"   " to equal undefined', () => {
      expect(types.normalize('   ')).toBeUndefined();
    });

    test('"0" to equal "0"', () => {
      expect(types.normalize('0')).toStrictEqual('0');
    });

    test('"3.14" to equal "3.14"', () => {
      expect(types.normalize('3.14')).toStrictEqual('3.14');
    });

    test('"12345" to equal "12345"', () => {
      expect(types.normalize('12345')).toStrictEqual('12345');
    });

    test('"   12345   " to equal "12345"', () => {
      expect(types.normalize('   12345   ')).toStrictEqual('12345');
    });

    test('"testString" to equal "testString"', () => {
      expect(types.normalize('testString')).toStrictEqual('testString');
    });

    test('"   testStringTrim   " to equal "testStringTrim"', () => {
      expect(types.normalize('   testStringTrim   ')).toStrictEqual('testStringTrim');
    });
  });
});
