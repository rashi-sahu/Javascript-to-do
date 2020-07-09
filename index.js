var fs = require("fs");
var utils = require("./utils");

var inputFileName = "brand_name.txt";

var cb1 = function (err, fileData) {
  var brandName = utils.fetchBrandNamesFrom(fileData);
  var urlArray = utils.makeUrlFrom(brandName);
  utils.callMakeUpApi(urlArray);
};

fs.readFile(inputFileName, cb1);
