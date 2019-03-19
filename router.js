const express = require('express');
const path = require('path');
const router = express.Router();
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    // intercept specific route for retrieving local dummy data
    router.get('/local_data', function(req, res) {
        res.sendFile(path.join(__dirname, '/test/mock_response.json'));
    });
}

router.get('/*', function(req, res) {
    res.redirect('/');
});

module.exports = router;