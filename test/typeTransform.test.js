const typeTransform = require('../src/typeTransform');

test('"0" to equal 0 after number type transform', () => {
  expect(typeTransform.number('0')).toStrictEqual(0);
});

test('"3" to equal 3 after number type transform', () => {
  expect(typeTransform.number('3')).toStrictEqual(3);
});

test('"invalidNumberString" to equal undefined after number type transform', () => {
  expect(typeTransform.number('invalidNumberString')).toBeUndefined();
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
  expect(typeTransform.boolean('anyStringNotEqual1orTrue')).toStrictEqual(
    false
  );
});

test('"a,b,c" to equal [a,b,c] after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim('a,b,c')).toStrictEqual(['a', 'b', 'c']);
});

test('" a ,  b   , c " to equal [a,b,c] after arrayCommaDelim type transform', () => {
  expect(typeTransform.arrayCommaDelim(' a ,  b   , c ')).toStrictEqual([
    'a',
    'b',
    'c',
  ]);
});

test('stringify object to equal object after object type transform', () => {
  expect(
    typeTransform.object(
      '{ "a": 1, "b": "str1", "c": [], "d": true, "e": { "f": [ 2 , 3, "str2"] } }'
    )
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
