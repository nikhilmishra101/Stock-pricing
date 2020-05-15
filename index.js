const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
var crypto = require("crypto");
var publicKey = "ZWU4OGVlODk1NjgxNDliZGIzYmM4NGI1N2VjZTQ2NTQ";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    headers: {
      "x-ba-key": publicKey,
    },
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount,
    },
  };
  request(options, function (error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    console.log(price);

    var currentDate = data.time;
    console.log(data.success);

    res.write("<p>The current date is " + currentDate + "</p>");
    res.write(
      "<h1>" + amount + crypto + " is currently worth " + price + fiat + "</h1>"
    );
    res.send();
  });
});

app.listen(3000, function () {
  console.log("Listening at port 3000");
});
