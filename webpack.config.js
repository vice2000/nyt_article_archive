const { resolve } = require('path');

module.exports = {
    context: resolve(__dirname, 'js'),
    entry: './main.js',
    output: {
        path: resolve(__dirname, 'static/js'),
        filename: 'main.js'
    }
};