const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=9e45703d4ebce98a50d6970fda54c452"
    https.get(url, function(response){
        console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const desc = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        console.log(weatherData);
        console.log(temp);
        console.log(desc);
        res.write("<h1>The temp in San Jose is " + temp + " degrees Celcius. \nAnd it looks like " + desc + ".</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
        })
    })

})


app.listen(3000, function(){
    console.log("Server started on port 3000");
});