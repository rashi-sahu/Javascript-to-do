const utils = require("./utils");
var sinon = require('sinon');
const request = require("request");
var fs = require("fs");

var Sandbox = sinon.createSandbox();
// test("add function should add 2 integers correctly", () => {
//   expect(utils.sum(1, 2)).toBe(3);
//   expect(utils.sum(0, 0)).toBe(0);
//   expect(utils.sum(-1, 2)).toBe(1);
// });

describe("fetchBrandNamesFrom", () => {
  it("should return string array from file data", () => {
    var inputString = "covergirl\npiggy paint\ndalish";
    var input = Buffer.from(inputString, 'utf8');
    var output = ["covergirl", "piggy paint","dalish"];
    expect(utils.fetchBrandNamesFrom(input)).toEqual(output);
  });

  it("should ignore empty lines and string array from file data", () => {
    var inputString = "covergirl\npiggy paint\n\ndalish";
    var input = Buffer.from(inputString, 'utf8');
    var output = ["covergirl", "piggy paint","dalish"];
    expect(utils.fetchBrandNamesFrom(input)).toEqual(output);
  });

  it("should return empty array for empty file", () => {
    var inputString = "";
    var input = Buffer.from(inputString, 'utf8');
    var output = [];
    expect(utils.fetchBrandNamesFrom(input)).toEqual(output);
  });

});

describe("makeUrlFrom", () => {
  it("should return url array from band name array", () => {
    var input = ["covergirl", "dalish"];
    var output = ["http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl" , "http://makeup-api.herokuapp.com/api/v1/products.json?brand=dalish"];
    expect(utils.makeUrlFrom(input)).toEqual(output);
  });

  it("should return empty url array from empty band name array", () => {
    var input = [];
    var output = [];
    expect(utils.makeUrlFrom(input)).toEqual(output);
  });
});

describe("getUniqueProductTypeListFrom", () => {
  it("should fetch unique product types from json string", () => {
    var arr = [{ product_type: "xyz" }, { product_type: "abc" },{ product_type: "xyz" }, { product_type: "abc" },{ product_type: "pqr" }, { product_type: "efg" }];
    var input = JSON.stringify(arr);
    var output = ["xyz","abc","pqr","efg"];
    expect(utils.getUniqueProductTypeListFrom(input)).toEqual(output);
  });

  it("should not include null product types in array", () => {
    var arr = [{ product_type: "xyz" }, { product_type: "abc" },{ product_type: "xyz" }, { product_type: "abc" },{ product_type: null }, { product_type: "efg" }];
    var input = JSON.stringify(arr);
    var output = ["xyz","abc","efg"];
    expect(utils.getUniqueProductTypeListFrom(input)).toEqual(output);
  });

  it("should return empty string when product type is null", () => {
    var arr = [{ product_type: null }];
    var input = JSON.stringify(arr);
    var output = [];
    expect(utils.getUniqueProductTypeListFrom(input)).toEqual(output);
  });

  it("should return empty string when product type is empty", () => {
    var arr = [];
    var input = JSON.stringify(arr);
    var output = [];
    expect(utils.getUniqueProductTypeListFrom(input)).toEqual(output);
  });

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

describe("writeUniqueProductTypeListToFile", () => {
  it("should call file apped with correct argument", () => {
    var brand ="covergirl";
    var uniqueProduct = ["rashi", "sahu"]
    Sandbox.stub(fs, 'appendFile').resolves(["rashi"]);
    utils.writeUniqueProductTypeListToFile(brand, uniqueProduct);
    Sandbox.assert.calledWith(fs.appendFile, sinon.match("unique_product.txt", brand + " - " + uniqueProduct + "\n"));
  });

});

// describe("cb2", () => {
//   it("should call function 1 time", () => {
//     var brand ="covergirl";
//     var uniqueProduct = ["lipstick", "blush"];
//     var randomArugment = "blah blah blah !!!";
//     Sandbox.stub(utils, 'getUniqueProductTypeListFrom').returns(uniqueProduct);
//     Sandbox.stub(utils, 'getBrandNameFrom').returns(brand);
//     Sandbox.stub(utils, 'writeUniqueProductTypeListToFile');
//     utils.cb2(randomArugment);

//     Sandbox.assert.calledWithExactly(utils.writeUniqueProductTypeListToFile, brand, uniqueProduct);

//   });

// });
