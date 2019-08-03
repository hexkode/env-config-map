const typeTransform = require('../src/typeTransform');

// string
test('null to equal undefined after string type transform', () => {
  expect(typeTransform.string(null)).toBeUndefined();
});

test('undefined to equal undefined after string type transform', () => {
  expect(typeTransform.string(undefined)).toBeUndefined();
});

test('"" to equal "" after string type transform', () => {
  expect(typeTransform.string('')).toStrictEqual('');
});

test('"   " to equal "" after string type transform', () => {
  expect(typeTransform.string('   ')).toStrictEqual('');
});

test('"stringTest" to equal undefined after string type transform', () => {
  expect(typeTransform.string('stringTest')).toStrictEqual('stringTest');
});

test('"   stringTestTrim   " to equal undefined after string type transform', () => {
  expect(typeTransform.string('   stringTestTrim   ')).toStrictEqual('stringTestTrim');
});

// number
test('"" to equal undefined after number type transform', () => {
  expect(typeTransform.number('')).toBeUndefined();
});

test('"   " to equal undefined after number type transform', () => {
  expect(typeTransform.number('   ')).toBeUndefined();
});

test('null to equal undefined after number type transform', () => {
  expect(typeTransform.number(null)).toBeUndefined();
});

test('undefined to equal undefined after number type transform', () => {
  expect(typeTransform.number(undefined)).toBeUndefined();
});

test('"0" to equal 0 after number type transform', () => {
  expect(typeTransform.number('0')).toStrictEqual(0);
});

test('"3" to equal 3 after number type transform', () => {
  expect(typeTransform.number('3')).toStrictEqual(3);
});

test('"invalidNumberString" to equal undefined after number type transform', () => {
  expect(typeTransform.number('invalidNumberString')).toBeUndefined();
});

// boolean
test('"" to equal undefined after boolean type transform', () => {
  expect(typeTransform.boolean('')).toBeUndefined();
});

test('"   " to equal undefined after boolean type transform', () => {
  expect(typeTransform.boolean('   ')).toBeUndefined();
});

test('null to equal undefined after boolean type transform', () => {
  expect(typeTransform.boolean(null)).toBeUndefined();
});

test('"true" to equal true after boolean type transform', () => {
  expect(typeTransform.boolean('true')).toStrictEqual(true);
});

test('"1" to equal true after boolean type transform', () => {
  expect(typeTransform.boolean('1')).toStrictEqual(true);
});

test('"false" to equal false after boolean type transform', () => {
  expect(typeTransform.boolean('false')).toStrictEqual(false);
});

test('"0" to equal false after boolean type transform', () => {
  expect(typeTransform.boolean('0')).toStrictEqual(false);
});

test('"anyStringNotEqual1orTrue" to equal false after boolean type transform', () => {
  expect(typeTransform.boolean('anyStringNotEqual1orTrue')).toStrictEqual(false);
});

// object
test('"" to equal undefined after object type transform', () => {
  expect(typeTransform.object('')).toBeUndefined();
});

test('"   " to equal undefined after object type transform', () => {
  expect(typeTransform.object('   ')).toBeUndefined();
});

test('null to equal undefined after object type transform', () => {
  expect(typeTransform.object(null)).toBeUndefined();
});

test('Invalid json string to equal undefined after object type transform', () => {
  expect(typeTransform.object('{ "a": 1')).toBeUndefined();
});

test('stringify object to equal object after object type transform', () => {
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

// arrayCommaDelim
test('"" to equal undefined after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim('')).toBeUndefined();
});

test('"   " to equal undefined after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim('   ')).toBeUndefined();
});

test('null to equal undefined after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim(null)).toBeUndefined();
});

test('"a,b,c" to equal [a,b,c] after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
});

test('" a ,  b   , c " to equal [a,b,c] after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual(['a', 'b', 'c']);
});

// _normalize
test('"" to equal undefined after _normalize type transform', () => {
  expect(typeTransform._normalize('')).toBeUndefined();
});

test('"   " to equal undefined after _normalize type transform', () => {
  expect(typeTransform._normalize('   ')).toBeUndefined();
});

test('null to equal undefined after _normalize type transform', () => {
  expect(typeTransform._normalize(null)).toBeUndefined();
});

test('"_normalizeTestString" to equal "_normalizeTestString" after _normalize type transform', () => {
  expect(typeTransform._normalize('_normalizeTestString')).toStrictEqual('_normalizeTestString');
});

test('"   _normalizeTestStringTrim   " to equal "_normalizeTestString" after _normalize type transform', () => {
  expect(typeTransform._normalize('   _normalizeTestStringTrim   ')).toStrictEqual('_normalizeTestStringTrim');
});
