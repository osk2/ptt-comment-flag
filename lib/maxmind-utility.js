const maxmind = require('maxmind');
const options = {
  cache: {
    max: 5000
  }
};

module.exports = maxmind.open('./resources/GeoLite2-City.mmdb', options);
