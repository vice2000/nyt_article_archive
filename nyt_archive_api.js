var https = require('https');
var api_key = process.env.NYT_ARCHIVE_API_KEY ? process.env.NYT_ARCHIVE_API_KEY : 'No api key provided';
var options = {
    hostname: 'api.nytimes.com',
    port: 443,
    path: '',
    method: 'GET',
    headers: { 'api-key': api_key },
};
exports.get_request = function(request, on_result){
    options.path = `/svc/archive/v1/${request.body.year}/${request.body.month}.json`;
    var req = https.request(options, function(res){
        var responseBody = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            responseBody += chunk;
        });

        res.on('end', function() {
            on_result(responseBody, res.statusCode);
        });
    });

    req.on('error', function(err) {
        throw (err);
    });

    req.end();

};
