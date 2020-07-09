const request = require("request");
const R = require("ramda");
var fs = require("fs");

var ouputFileName = "unique_product.txt";

var fetchBrandNamesFrom = function (fileData) {
  return fileData
    .toString()
    .split("\n")
    .map((x) => x.replace("\r", ""));
};

var makeUrlFrom = function (brandName) {
  var urlArray = [];
  for (var i = 0; i < brandName.length; i++) {
    var url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName[i]}`;
    urlArray.push(url);
  }
  return urlArray;
};

var getUniqueProductTypeListFrom = function (body) {
  var products = JSON.parse(body);
  var productTypeList = [];
  products.forEach((element) => {
    productTypeList.push(element.product_type);
  });
  return R.uniq(productTypeList);
};

var getBrandNameFrom = function (body) {
  var products = JSON.parse(body);
  return products[0].brand;
};

var writeUniqueProductTypeListToFile = function (brand, uniqueProductTypeList) {
  fs.appendFile(
    ouputFileName,
    brand + " - " + uniqueProductTypeList + "\n",
    function (err) {
      if (err) {
        console.log("Error Occurs !!!", err);
      } else {
        console.log("Done !!!");
      }
    }
  );
};

var cb2 = function (error, response, body) {
  var uniqueProductTypeList = getUniqueProductTypeListFrom(body);
  var brand = getBrandNameFrom(body);
  writeUniqueProductTypeListToFile(brand, uniqueProductTypeList);
};

var callMakeUpApi = function (urlArray) {
  for (var i = 0; i < urlArray.length; i++) {
    request(urlArray[i], cb2);
  }
};

module.exports = {
  fetchBrandNamesFrom,
  makeUrlFrom,
  callMakeUpApi,
};