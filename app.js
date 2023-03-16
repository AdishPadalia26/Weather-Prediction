const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "0bbe7e71bb8873ab7cd618dac2a9da00";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      res.write(
        "<h1>The temperature in " +
          req.body.cityName +
          " is " +
          temp +
          " degree Celsius.</h1>"
      );
      res.write("<p>The weather description is " + weatherDescription + ".<p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});
