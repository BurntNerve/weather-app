const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${
  encodedAddress
}`;

axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }
    console.log(response.data.results[0].formatted_address);
    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.forecast.io/forecast/c4a3e561dbbcb610d7e6455e184782ae/${
      latitude
    },${longitude}`;
    return axios.get(weatherURL);
  })
  .then(response => {
    const { temperature, apparentTemperature } = response.data.currently;
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}`
    );
  })
  .catch(err => {
    console.log(err.message);
  });
