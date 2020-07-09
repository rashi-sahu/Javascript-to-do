const utils = require("./utils");

test("add function should add 2 integers correctly", () => {
  expect(utils.sum(1, 2)).toBe(3);
  expect(utils.sum(0, 0)).toBe(0);
  expect(utils.sum(-1, 2)).toBe(1);
});

describe("getBrandNameFrom", () => {
  it("should fetch brand name from json string", () => {
    var arr = [{ brand: "covergirl" }, { brand: "covergirl" }];
    var input = JSON.stringify(arr);
    var output = "covergirl";
    expect(utils.getBrandNameFrom(input)).toBe(output);
  });

  it("should throw an error when json string is empty", () => {
    try {
      var arr = [];
      var input = JSON.stringify(arr);
      utils.getBrandNameFrom(input);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
