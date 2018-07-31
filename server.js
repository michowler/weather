
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = process.env.WEATHER_API_KEY;
const dotenv = require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {	
  res.render('index');

})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;

	request(url, function (err, response, body) {
    if(err){    	
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      console.log(weather)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = 'It is '+ weather.main.temp + ' degrees in '+ weather.name + ' !';
        res.render('index', {        	
        	error: null,
        	weather : JSON.stringify(weather),
        	weather: weatherText, 
        });
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})