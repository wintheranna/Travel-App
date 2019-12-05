const dotenv = require('dotenv');
dotenv.config();
// Personal API key for DarkSky API and Pixabay API
const keyDS = process.env.DS_KEY;
const urlDS = 'https://api.darksky.net/forecast/';
const keyPB = process.env.PB_KEY;
const urlPB = 'https://pixabay.com/api/';
const fetch = require('node-fetch');

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const port = 8083;

// Initialize the main project folder
app.use(express.static('./dist'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(8083, function () {
    console.log(`server running on localhost: ${port}`);
  });
}

app.get('/', function (req, res) {
  res.send('./dist/index.html');
})

// Initialize all route with a callback function
app.get('/all', callBack);

// Callback function to complete GET '/all'
function callBack(req, res){
  res.send(projectData);
}

// Post Route
app.post('/save', function (req, res) {
    projectData.location = req.body.location;
    projectData.country = req.body.country;
    projectData.latitude = req.body.latitude;
    projectData.longitude = req.body.longitude;
    projectData.daysleft = req.body.daysleft;
    projectData.futureWeather = req.body.futureWeather;
    console.log('Post recieved');
    res.end();
});

// API call DarkSky
app.get('/api', async (req, res) => {
  let lat = projectData.latitude + ',';
  let long = projectData.longitude + ',';
  let time = projectData.futureWeather;
  const apiUrl = urlDS+keyDS+lat+long+time;
  const response = await fetch(apiUrl);
    try {
      const data = await response.json();
      res.send(data);
      console.log(data);
  } catch(error) {
      console.log('error', error);
      }
});


// API call Pixabay
app.get('/photo', async (req, res) => {
  let location = projectData.location;
  console.log(location);
  const ourUrl = urlPB+keyPB+'&q='+encodeURIComponent(location)+'&image_type=photo';
  const response = await fetch(ourUrl);
    try {
      const data = await response.json();
      res.send(data);
  } catch(error) {
      console.log('error', error);
      }
});

// alternative API call Pixabay, in case of no photo
app.get('/photo2', async (req, res) => {
  let country = projectData.country;
  console.log(country);
  const ourUrl = urlPB+keyPB+'&q='+encodeURIComponent(country)+'&image_type=photo';
  const response = await fetch(ourUrl);
    try {
      const data = await response.json();
      res.send(data);
  } catch(error) {
      console.log('error', error);
      }
});

module.exports = app;
