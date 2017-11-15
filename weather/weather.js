const request = require('request');

getWeather = (latitude, longitude, callback) => {
  request(
    {
      url: `https://api.forecast.io/forecast/c4a3e561dbbcb610d7e6455e184782ae/${
        latitude
      },${longitude}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          currentTemp: body.currently.temperature,
          feelsLike: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weather.');
      }
    }
  );
};

module.exports = { getWeather };
