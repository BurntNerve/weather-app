const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch the weather for.',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    const { latitude, longitude, address } = results;
    weather.getWeather(latitude, longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        if (results.currentTemp !== results.feelsLike) {
          console.log(
            `It is ${results.currentTemp} in ${address}, but it feels like ${
              results.feelsLike
            }`
          );
        } else {
          console.log(`It is ${results.currentTemp} in ${address}`);
        }
      }
    });
  }
});
