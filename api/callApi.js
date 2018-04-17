const https = require('https');
const api_key = process.env.NYT_ARCHIVE_API_KEY ? process.env.NYT_ARCHIVE_API_KEY : 'No api key provided';
const debug = process.env.ENVIRONMENT === 'development';
const JSONStream = require('JSONStream');
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

        res.setEncoding('utf8');

        let teasers = [],
            items = [
                'web_url',
                'snippet',
                'headline',
                'pub_date',
                'keywords'
            ];

        items.map((item) => {
            res.pipe(
                JSONStream.parse(['response', 'docs', true, item], (selectedItem, args) => {
                    // create empty teaser object
                    if(!teasers[args[2]]) {
                        teasers[args[2]] = {};
                    }
                    teasers[args[2]][item] = selectedItem;
                })
            );
        });

        res.on('end', () => {
            on_result(JSON.stringify(teasers), res.statusCode);
        });
    });
    req.on('error', err => {
        throw (err);
    });
    req.end();

};
