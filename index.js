var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./nyt_archive_api.js');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/static'));

app.listen(app.get('port'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/', function (req, res) {
    api.get_request(req, function(result, status_code){
        res.status(status_code).send(result);
    });
});
