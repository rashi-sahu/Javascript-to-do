const request = require("request");
const R = require("ramda");
var fs = require("fs");

var url_array = [];
fs.readFile("brand_name.txt", function cb1(err, data) {
  var brand_name = data
    .toString()
    .split("\n")
    .map((x) => x.replace("\r", ""));

  for (var i = 0; i < brand_name.length; i++) {
    var url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand_name[i]}`;
    url_array.push(url);
  }

  for (var i = 0; i < url_array.length; i++) {
    request(url_array[i], function cb2(error, response, body) {
      var products = JSON.parse(body);
      var product_type_list = [];
      var brand = products[0].brand;
      products.forEach((element) => {
        product_type_list.push(element.product_type);
      });
      var unique_product_type_list = R.uniq(product_type_list);

      fs.appendFile(
        "unique_product.txt",
        brand + " - " + unique_product_type_list + "\n",
        function (err) {
          console.log(brand_name);
        }
      );
    });
  }
});
