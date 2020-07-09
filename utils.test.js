const utils = require('./utils');

test('add function showed add 2 integers correctly', () => {
  expect(utils.sum(1, 2)).toBe(3);
  expect(utils.sum(0, 0)).toBe(0);
  expect(utils.sum(-1, 2)).toBe(1);
});