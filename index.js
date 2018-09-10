const app = require('express')();
const bodyParser = require('body-parser');
const geoip2 = require('geoip2');
const ipValidation = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

app.use(bodyParser.json());
geoip2.init('./resources/GeoLite2-City.mmdb');

const getIp = ip => {
  return new Promise((resolve, reject) => {
    if (!ipValidation.test(ip)) {
      return reject('Invalid IP format.');
    }
  
    geoip2.lookupSimple(ip, (err, result) => {
      if (err) {
        return reject(err);
      }
      console.log(result);
      return resolve(result);
    });
  });
}

app.post('/ip', async (req, res) => {
  const ipList = req.body.ip;

  try {
    if (!Array.isArray(ipList)) {
      res.sendStatus(400);
    }
  
    const resolvedIPList = await Promise.all(ipList.map(ip => getIp(ip)));
    const flagList = resolvedIPList.map(ip => `/resources/flags/${ip.country.toLowerCase()}.png`);
    res.json(flagList);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
