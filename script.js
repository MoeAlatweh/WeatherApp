/**
 * Weather App
 */

/* API: is the acronym for 'Application Programming Interface', 
 which is a software intermediary that allows two applications to talk to each other. 
 Each time you use an app like Facebook, send an instant message, or check the weather on your phone, you're using an API.
*/
// API_KEY for maps api
// (API_KEY): is Password that let you connect with the API, you get it from website API itself 
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * we create function to get the data from API
 * the full URL to get the data for specific city should be something like that:
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 *    (https://api.openweathermap.org/data/2.5/weather): this is the general URL to connect the API weather data
 *    after the question mark(?) we use URL paramters to access rest of data
 *    (q):is mean query that you lokinf for which is the city name in our case (required)
 *    (&):is just mean and normally
 *    (appid):is API_KEY -or on other words- is the password to connect with API (required)
 *    (units):is just the unit will use to desplay the temp (celsius or fahrenheit) (optional)   
 */
getWeatherData = (city) => {
  // this is the general URL to connect the API weather data  
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  // we use (Template Literals) methode to connect the string(`${string}${string}`)
  // it will be same as : (URL+"?q="+city+"&appid="+API_KEY+"&units=imperial")
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  // promise method used to check the connection with API and return either the data you looking for, or message for any error
  // we use fetch and promise method to get the data of spacific city, we use (json) because that how the data stored in the API 
  const weatherPromise  = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  })
}

/**
 * Retrieve city input and get the weather data
 */
searchCity = () => {
  const city = document.getElementById('city-input').value;
  // we use function above to get the data
  getWeatherData(city)
  // continue to promise method we start in above function
  .then((res)=>{
    // we call the function below to show the results as RESPONSE of promise method  
    showWeatherData(res);
  }).catch((error)=>{
    console.log(error);
    console.log("Something happend");
  })
}

/**
 * Show the weather data in HTML
 */
showWeatherData = (weatherData) => {
    // get the data from API by promise method and change them in HTML
  document.getElementById("city-name").innerText = weatherData.name;
  document.getElementById("weather-type").innerText = weatherData.weather[0].main;
  document.getElementById("temp").innerText = weatherData.main.temp;
  document.getElementById("min-temp").innerText = weatherData.main.temp_min;
  document.getElementById("max-temp").innerText = weatherData.main.temp_max;
  document.getElementById("weather-output").classList.add('visible');
}

