const typeTransform = require('../../src/typeTransform');

describe('type transform', () => {
  describe('string', () => {
    test('"" to equal ""', () => {
      expect(typeTransform.string('')).toStrictEqual('');
    });

    test('"   " to equal ""', () => {
      expect(typeTransform.string('   ')).toStrictEqual('');
    });

    test('"0" to equal "0"', () => {
      expect(typeTransform.string('0')).toStrictEqual('0');
    });

    test('"3.14" to equal "3.14"', () => {
      expect(typeTransform.string('3.14')).toStrictEqual('3.14');
    });

    test('"12345" to equal "12345"', () => {
      expect(typeTransform.string('12345')).toStrictEqual('12345');
    });

    test('"   12345   " to equal "12345"', () => {
      expect(typeTransform.string('   12345   ')).toStrictEqual('12345');
    });

    test('"stringTest" to equal "stringTest"', () => {
      expect(typeTransform.string('stringTest')).toStrictEqual('stringTest');
    });

    test('"   stringTestTrim   " to equal "stringTestTrim"', () => {
      expect(typeTransform.string('   stringTestTrim   ')).toStrictEqual('stringTestTrim');
    });

    test('undefined to equal undefined', () => {
      expect(typeTransform.string(undefined)).toBeUndefined();
    });
  });

  describe('number', () => {
    test('0 to equal 0', () => {
      expect(typeTransform.number(0)).toStrictEqual(0);
    });

    test('3 to equal 3', () => {
      expect(typeTransform.number(3)).toStrictEqual(3);
    });

    test('3.14 to equal 3.14', () => {
      expect(typeTransform.number(3.14)).toStrictEqual(3.14);
    });

    test('0.009 to equal 0.009', () => {
      expect(typeTransform.number(0.009)).toStrictEqual(0.009);
    });

    test('"0" to equal 0', () => {
      expect(typeTransform.number('0')).toStrictEqual(0);
    });

    test('"3" to equal 3', () => {
      expect(typeTransform.number('3')).toStrictEqual(3);
    });

    test('"3.14" to equal 3.14', () => {
      expect(typeTransform.number('3.14')).toStrictEqual(3.14);
    });

    test('"0.009" to equal 0.009', () => {
      expect(typeTransform.number('0.009')).toStrictEqual(0.009);
    });

    test('"invalidNumberString" to equal undefined', () => {
      expect(typeTransform.number('invalidNumberString')).toBeUndefined();
    });

    test('undefined to equal undefined', () => {
      expect(typeTransform.number(undefined)).toBeUndefined();
    });
  });

  describe('boolean', () => {
    test('true to equal true', () => {
      expect(typeTransform.boolean(true)).toStrictEqual(true);
    });

    test('false to equal false', () => {
      expect(typeTransform.boolean(false)).toStrictEqual(false);
    });

    test('"true" to equal true', () => {
      expect(typeTransform.boolean('true')).toStrictEqual(true);
    });

    test('"1" to equal true', () => {
      expect(typeTransform.boolean('1')).toStrictEqual(true);
    });

    test('"false" to equal false', () => {
      expect(typeTransform.boolean('false')).toStrictEqual(false);
    });

    test('"0" to equal false', () => {
      expect(typeTransform.boolean('0')).toStrictEqual(false);
    });

    test('"neTrue1False0" to equal undefined', () => {
      expect(typeTransform.boolean('neTrue1False0')).toBeUndefined();
    });

    test('undefined to equal undefined', () => {
      expect(typeTransform.boolean(undefined)).toBeUndefined();
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
      expect(typeTransform.object(objectFixture)).toStrictEqual(objectFixture);
    });

    test('stringify object to equal object', () => {
      expect(
        typeTransform.object('{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }')
      ).toStrictEqual(objectFixture);
    });

    test('invalid json string to equal undefined', () => {
      expect(typeTransform.object('{ "a": 1')).toBeUndefined();
    });

    test('undefined to equal undefined', () => {
      expect(typeTransform.object(undefined)).toBeUndefined();
    });
  });

  describe('arrayCommaDelim', () => {
    test('"a,b,c" to equal [a,b,c]', () => {
      expect(typeTransform.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
    });

    test('" a ,  b   , c " to equal [a,b,c]', () => {
      expect(typeTransform.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
    });

    test('undefined to equal undefined', () => {
      expect(typeTransform.arrayCommaDelim(undefined)).toBeUndefined();
    });
  });

  describe('_normalize', () => {
    test('{} to equal undefined', () => {
      expect(typeTransform._normalize({})).toBeUndefined();
    });

    test('[] to equal undefined', () => {
      expect(typeTransform._normalize([])).toBeUndefined();
    });

    test('true to equal undefined', () => {
      expect(typeTransform._normalize(true)).toBeUndefined();
    });

    test('null to equal undefined', () => {
      expect(typeTransform._normalize(null)).toBeUndefined();
    });

    test('"" to equal undefined', () => {
      expect(typeTransform._normalize('')).toBeUndefined();
    });

    test('"   " to equal undefined', () => {
      expect(typeTransform._normalize('   ')).toBeUndefined();
    });

    test('"0" to equal "0"', () => {
      expect(typeTransform._normalize('0')).toStrictEqual('0');
    });

    test('"3.14" to equal "3.14"', () => {
      expect(typeTransform._normalize('3.14')).toStrictEqual('3.14');
    });

    test('"12345" to equal "12345"', () => {
      expect(typeTransform._normalize('12345')).toStrictEqual('12345');
    });

    test('"   12345   " to equal "12345"', () => {
      expect(typeTransform._normalize('   12345   ')).toStrictEqual('12345');
    });

    test('"testString" to equal "testString"', () => {
      expect(typeTransform._normalize('testString')).toStrictEqual('testString');
    });

    test('"   testStringTrim   " to equal "testStringTrim"', () => {
      expect(typeTransform._normalize('   testStringTrim   ')).toStrictEqual('testStringTrim');
    });
  });
});
