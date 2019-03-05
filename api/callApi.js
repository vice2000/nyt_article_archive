const https = require('https');
const api_key = process.env.NYT_ARCHIVE_API_KEY ? process.env.NYT_ARCHIVE_API_KEY : 'No api key provided';
const isLocal = process.env.CALL_API === 'local';
const options = {
    hostname: 'api.nytimes.com',
    port: 443,
    path: '',
    method: 'GET'
};

if (isLocal) {
    // eslint-disable-next-line no-console
    console.log('### using local dummy data ###');
    options.port = 8443;
    options.hostname = 'localhost';
    options.path = '/mock_response.json'; 
}

exports.callApi = (request, on_result) => {

    if (!isLocal) {
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
