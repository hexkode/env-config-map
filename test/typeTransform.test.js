const typeTransform = require('../src/typeTransform');

describe('string type transform', () => {
  test('null to equal undefined', () => {
    expect(typeTransform.string(null)).toBeUndefined();
  });

  test('undefined to equal undefined', () => {
    expect(typeTransform.string(undefined)).toBeUndefined();
  });

  test('"" to equal ""', () => {
    expect(typeTransform.string('')).toStrictEqual('');
  });

  test('"   " to equal ""', () => {
    expect(typeTransform.string('   ')).toStrictEqual('');
  });

  test('"stringTest" to equal "stringTest"', () => {
    expect(typeTransform.string('stringTest')).toStrictEqual('stringTest');
  });

  test('"   stringTestTrim   " to equal "stringTestTrim"', () => {
    expect(typeTransform.string('   stringTestTrim   ')).toStrictEqual('stringTestTrim');
  });
});

describe('number type transform', () => {
  test('"" to equal undefined', () => {
    expect(typeTransform.number('')).toBeUndefined();
  });

  test('"   " to equal undefined', () => {
    expect(typeTransform.number('   ')).toBeUndefined();
  });

  test('null to equal undefined', () => {
    expect(typeTransform.number(null)).toBeUndefined();
  });

  test('undefined to equal undefined', () => {
    expect(typeTransform.number(undefined)).toBeUndefined();
  });

  test('"0" to equal 0', () => {
    expect(typeTransform.number('0')).toStrictEqual(0);
  });

  test('"3" to equal 3', () => {
    expect(typeTransform.number('3')).toStrictEqual(3);
  });

  test('"invalidNumberString" to equal undefined', () => {
    expect(typeTransform.number('invalidNumberString')).toBeUndefined();
  });
});

describe('boolean type transform', () => {
  test('"" to equal undefined', () => {
    expect(typeTransform.boolean('')).toBeUndefined();
  });

  test('"   " to equal undefined', () => {
    expect(typeTransform.boolean('   ')).toBeUndefined();
  });

  test('null to equal undefined', () => {
    expect(typeTransform.boolean(null)).toBeUndefined();
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
});

describe('object type transform', () => {
  test('"" to equal undefined', () => {
    expect(typeTransform.object('')).toBeUndefined();
  });

  test('"   " to equal undefined', () => {
    expect(typeTransform.object('   ')).toBeUndefined();
  });

  test('null to equal undefined', () => {
    expect(typeTransform.object(null)).toBeUndefined();
  });

  test('invalid json string to equal undefined', () => {
    expect(typeTransform.object('{ "a": 1')).toBeUndefined();
  });

  test('stringify object to equal object', () => {
    expect(
      typeTransform.object('{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }')
    ).toStrictEqual({
      a: 1,
      b: 'str1',
      c: [],
      d: true,
      e: {
        f: [2, 3, 'str2'],
      },
    });
  });
});

describe('arrayCommaDelim type transform', () => {
  test('"" to equal undefined', () => {
    expect(typeTransform.arrayCommaDelim('')).toBeUndefined();
  });

  test('"   " to equal undefined', () => {
    expect(typeTransform.arrayCommaDelim('   ')).toBeUndefined();
  });

  test('null to equal undefined', () => {
    expect(typeTransform.arrayCommaDelim(null)).toBeUndefined();
  });

  test('"a,b,c" to equal [a,b,c]', () => {
    expect(typeTransform.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
  });

  test('" a ,  b   , c " to equal [a,b,c]', () => {
    expect(typeTransform.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
  });
});

describe('_normalize type transform', () => {
  test('"" to equal undefined', () => {
    expect(typeTransform._normalize('')).toBeUndefined();
  });

  test('"   " to equal undefined', () => {
    expect(typeTransform._normalize('   ')).toBeUndefined();
  });

  test('null to equal undefined', () => {
    expect(typeTransform._normalize(null)).toBeUndefined();
  });

  test('"testString" to equal "testString"', () => {
    expect(typeTransform._normalize('testString')).toStrictEqual('testString');
  });

  test('"   testStringTrim   " to equal "testStringTrim"', () => {
    expect(typeTransform._normalize('   testStringTrim   ')).toStrictEqual('testStringTrim');
  });
});
