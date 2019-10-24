const axios = require("axios");

const name = process.argv[2];

//const args = process.argv.slice(2);  Vasilis => Array an array of just Berlin

const key = "13779e558e4b6bfb74e19d11912be5f5";

let url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${key}&units=imperial`;

let foreCast = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&ctn=5&APPID=${key}&units=imperial`;

async function getCurrentWeather() {
  try {
    const response = await axios.get(url);
    console.log(
      `It is now ${response.data.main.temp}°F in ${response.data.name}, ${response.data.sys.country}`
    );
    console.log(
      `The current weather conditions are: ${response.data.weather[0].description}`
    );
  } catch (error) {
    console.log(`City couldn't be found`);
  }
}

getCurrentWeather();

async function getFiveDaysForecast() {
  try {
    const response = await axios.get(foreCast);
    const weatherDayOne = response.data.list[0];
    const weatherDayTwo = response.data.list[1];
    const weatherDayThree = response.data.list[2];
    const weatherDayFour = response.data.list[3];
    const weatherDayFive = response.data.list[4];
    console.log(
      `This is the weather for the following five days in Somewhere:`
    );
    console.log(
      `Today ${weatherDayOne.main.temp}°F, with ${weatherDayOne.weather[0].description}`
    );
    console.log(
      `${getWeekDay(weatherDayTwo.dt)} ${weatherDayTwo.main.temp}°F, with ${
        weatherDayTwo.weather[0].description
      }`
    );
    console.log(
      `${getWeekDay(weatherDayThree.dt)} ${weatherDayThree.main.temp}°F, with ${
        weatherDayThree.weather[0].description
      }`
    );
    console.log(
      `${getWeekDay(weatherDayFour.dt)}${weatherDayFour.main.temp}°F, with ${
        weatherDayFour.weather[0].description
      }`
    );
    console.log(
      `${getWeekDay(weatherDayFive.dt)}${weatherDayFive.main.temp}°F, with ${
        weatherDayFive.weather[0].description
      }`
    );
  } catch (error) {
    console.log(error);
  }
}

getFiveDaysForecast();

// Getting Date from Api and transform it

getWeekDay = timeStamp => {
  const date = new Date(timeStamp * 1000);
  const weekDay = date.getDay();
  switch (weekDay) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};
