const https = require('https');
const api_key = process.env.NYT_ARCHIVE_API_KEY ? process.env.NYT_ARCHIVE_API_KEY : 'No api key provided';
const useLocalData = process.env.USE_LOCAL_DATA === 'true';
const options = {
    hostname: 'api.nytimes.com',
    port: 443,
    path: '',
    method: 'GET'
};

if (useLocalData) {
    // eslint-disable-next-line no-console
    console.log('### using local dummy data ###');
    options.port = 8443;
    options.hostname = 'localhost';
    // path intercepted in router.js
    options.path = '/local_data'; 
}

exports.getApiData = (request, on_result) => {

    if (!useLocalData) {
        options.path = `/svc/archive/v1/${request.body.year}/${request.body.month}.json?api-key=${api_key}`;
    }

    const req = https.request(options, res => {

        res.setEncoding('utf8');

        let responseBody = '';

        res.on('data', chunk => {
            responseBody += chunk;
        });

        res.on('end', () => {
            on_result(responseBody, res.statusCode);
        });
    });
    req.on('error', err => {
        throw (err);
    });
    req.end();

};
