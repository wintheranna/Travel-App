// Function called by event listener
function performAction(event) {
  // user input
  let newlocation = document.getElementById('location').value;
  // count days left to departure
  let departure = document.getElementById('date').value;
  let departureDate = new Date(departure);
  let dateToday = new Date();
  let dateDiff = Math.ceil(departureDate.setHours(0, 0, 0) - dateToday.setHours(0, 0, 0)) / (1000 * 3600 * 24);
  let daysLeft = dateDiff.toFixed(0);
  let weatherDate = (departureDate.getTime()) / 1000;
  // API Key for GeoNames API
  const apiKey = '&username=anwin';
  const baseUrl = 'http://api.geonames.org/searchJSON?q=';

  // GET and POST data, update user interface
  getData(baseUrl, newlocation, apiKey)
  .then( (data) => {
    postData('http://localhost:8083/save', {
      location: data.geonames[0].name,
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      country: data.geonames[0].countryName,
      daysleft: daysLeft,
      futureWeather: weatherDate
    });
  }).then( () => {
    updateWeather('http://localhost:8083/api');
    }).then( () => {
      updateUI('http://localhost:8083/all');
      }).then( () => {
        updatePhoto('http://localhost:8083/photo');
        });
}

// Function to GET GeoNames API Data
const getData = async (baseUrl, newlocation, apiKey) => {
  const response = await fetch(baseUrl+newlocation+apiKey);
  try {
    const data = await response.json();
    return data;
  } catch(error) {
      console.log('error', error);
    }
}

// Function to POST data
const postData = async (url='', data={}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  try {
    console.log(response);
  } catch(error) {
      console.log('error', error);
    }
}


// Function to GET Project Data
const updateUI = async () => {
  const request = await fetch('http://localhost:8083/all');
  try {
    const allData = await request.json();
    document.getElementById('ourLocation').innerHTML = allData.location + ',';
    document.getElementById('country').innerHTML = allData.country + ' is';
    document.getElementById('days').innerHTML = allData.daysleft + ' days away!';
  } catch(error) {
      console.log('error', error);
    }
}

// Function to GET Project Data weather
const updateWeather = async () => {
  const response = await fetch('http://localhost:8083/api');
  try {
    const json = await response.json();
    document.getElementById('temperature').innerHTML = json.hourly.summary;
    document.getElementById('prognosisHigh').innerHTML = 'High - ' + json.daily.data[0].temperatureHigh + ' °F';
    document.getElementById('prognosisLow').innerHTML = 'Low - ' + json.daily.data[0].temperatureLow + ' °F';
  } catch(error) {
      console.log('error', error);
    }
}

// Function to GET Project Data photo
const updatePhoto = async () => {
  const response = await fetch('http://localhost:8083/photo');
  try {
    const json = await response.json();
    console.log(json.hits[0].webformatURL);
    document.getElementById('photo').innerHTML = '<img src='+json.hits[0].webformatURL+'>';
  } catch(error) {
      console.log('error', error);
      updatePhoto2();
    }
}

// If no city photo available , update with country photo
const updatePhoto2 = async () => {
  const response = await fetch('http://localhost:8083/photo2');
  try {
    const json = await response.json();
    console.log(json.hits[0].webformatURL);
    document.getElementById('photo').innerHTML = '<img src='+json.hits[0].webformatURL+'>';
  } catch(error) {
      console.log('error', error);
  }
}


export {performAction}
