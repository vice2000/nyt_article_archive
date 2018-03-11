const https = require('https');
const api_key = process.env.NYT_ARCHIVE_API_KEY ? process.env.NYT_ARCHIVE_API_KEY : 'No api key provided';
const debug = process.env.ENVIRONMENT === 'development';
const options = {
    hostname: 'api.nytimes.com',
    port: 443,
    path: '',
    method: 'GET',
    headers: { 'api-key': api_key },
};

if (debug) {
    options.port = 8443;
    options.hostname = 'localhost';
    options.path = '/mock_response.json'; 
}

exports.callApi = (request, on_result) => {

    if (!debug) {
        options.path = `/svc/archive/v1/${request.body.year}/${request.body.month}.json`;
    }

    const req = https.request(options, res => {
        let responseBody = '';
        res.setEncoding('utf8');

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
