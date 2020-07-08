
const request = require('request');
var url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick.google.com";
request(url, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', JSON.parse(body)[0].id); // Print the HTML for the Google homepage.
});