const types = require('../../src/types.js');

describe('types', () => {
  describe('string', () => {
    test('"" to equal ""', () => {
      expect(types.string('')).toStrictEqual('');
    });

    test('"   " to equal "   "', () => {
      expect(types.string('   ')).toStrictEqual('   ');
    });

    test('"testStringValue" to equal "testStringValue"', () => {
      expect(types.string('testStringValue')).toStrictEqual('testStringValue');
    });

    test('"   testStringValuePadded   " to equal "   testStringValuePadded   "', () => {
      expect(types.string('   testStringValuePadded   ')).toStrictEqual('   testStringValuePadded   ');
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

    test('"null" to equal null', () => {
      expect(types.string('null')).toBeNull();
    });

    test('"undefined" to equal undefined', () => {
      expect(types.string('undefined')).toBeUndefined();
    });

    test('"null" to equal "null" when coerceNull is disabled', () => {
      expect(types.string('null', { coerceNull: false })).toStrictEqual('null');
    });

    test('"undefined" to equal "undefined" when coerceUndefined is disabled', () => {
      expect(types.string('undefined', { coerceUndefined: false })).toStrictEqual('undefined');
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

    test('"invalidNumberString" to equal null', () => {
      expect(types.number('invalidNumberString')).toBeNull();
    });

    test('"null" to equal null', () => {
      expect(types.number('null')).toBeNull();
    });

    test('"undefined" to equal undefined', () => {
      expect(types.number('undefined')).toBeUndefined();
    });

    test('"null" to equal null when coerceNull is disabled', () => {
      expect(types.number('null', { coerceNull: false })).toBeNull();
    });

    test('"undefined" to equal null when coerceUndefined is disabled', () => {
      expect(types.number('undefined', { coerceUndefined: false })).toBeNull();
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

    test('" TrUe   " to equal true', () => {
      expect(types.boolean(' TrUe   ')).toStrictEqual(true);
    });

    test('"neTrue1False0" to equal null', () => {
      expect(types.boolean('neTrue1False0')).toBeNull();
    });

    test('"null" to equal null', () => {
      expect(types.boolean('null')).toBeNull();
    });

    test('"undefined" to equal undefined', () => {
      expect(types.boolean('undefined')).toBeUndefined();
    });

    test('"null" to equal null when coerceNull is disabled', () => {
      expect(types.boolean('null', { coerceNull: false })).toBeNull();
    });

    test('"undefined" to equal null when coerceUndefined is disabled', () => {
      expect(types.boolean('undefined', { coerceUndefined: false })).toBeNull();
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
      expect(types.object('{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }')).toStrictEqual(
        objectFixture,
      );
    });

    test('invalid json string to equal null', () => {
      expect(types.object('{ "a": 1')).toBeNull();
    });

    test('"null" to equal null', () => {
      expect(types.object('null')).toBeNull();
    });

    test('"undefined" to equal undefined', () => {
      expect(types.object('undefined')).toBeUndefined();
    });

    test('"null" to equal null when coerceNull is disabled', () => {
      expect(types.object('null', { coerceNull: false })).toBeNull();
    });

    test('"undefined" to equal null when coerceUndefined is disabled', () => {
      expect(types.object('undefined', { coerceUndefined: false })).toBeNull();
    });
  });

  describe('arrayCommaDelim', () => {
    test('"a,b,c" to equal [a,b,c]', () => {
      expect(types.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
    });

    test('" a ,  b   , c " to equal [a,b,c]', () => {
      expect(types.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
    });

    test('"null" to equal null', () => {
      expect(types.arrayCommaDelim('null')).toBeNull();
    });

    test('"undefined" to equal undefined', () => {
      expect(types.arrayCommaDelim('undefined')).toBeUndefined();
    });

    test('"null" to equal ["null"] when coerceNull is disabled', () => {
      expect(types.arrayCommaDelim('null', { coerceNull: false })).toStrictEqual(['null']);
    });

    test('"undefined" to equal ["undefined"] when coerceUndefined is disabled', () => {
      expect(types.arrayCommaDelim('undefined', { coerceUndefined: false })).toStrictEqual(['undefined']);
    });
  });
});
