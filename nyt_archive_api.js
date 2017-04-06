var https = require('https');
var config = require('./config.js');
var options = {
    hostname: 'api.nytimes.com',
    port: 443,
    path: '',
    method: 'GET',
    headers: { 'api-key': config().NYT_ARCHIVE_API_KEY,
        'Content-Type': 'application/json'},
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
