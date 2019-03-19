require('dotenv').config();
const express = require('express');
const router = require('./router');
const http = require('http');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const { callApi } = require('./api/callApi.js');
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-console
console.log('isDevelopment', isDevelopment);

app.use(express.static(__dirname + '/public'));

app.get('/*', router);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/', (req, res) => {
    callApi(req, (result, status_code) => {
        res.status(status_code).send(result);
    });
});

http.createServer(app).listen(port);

if (isDevelopment) {
    // serve mock data only in dev env
    const https = require('https');
    const privateKey  = process.env.SSLKEY ? fs.readFileSync(process.env.SSLKEY, 'utf8'): console.error('SSL Key missing');
    const certificate = process.env.SSLCERT ? fs.readFileSync(process.env.SSLCERT, 'utf8') : console.error('SSL Cert missing');
    const credentials = { key: privateKey, cert: certificate };

    https.createServer(credentials, app).listen(8443);
 
    // eslint-disable-next-line no-console
    console.log(`App listening on http://localhost:${port} and https://localhost:8443`);
}