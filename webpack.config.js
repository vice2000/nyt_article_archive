const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = (env) => {
    const devMode = env === 'development';
    const prodMode = env === 'production';
    const publicPath = resolve('public/');
    const bundleCss = new ExtractTextPlugin('bundle.css');

    const htmlSinglePage = new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve('src/index.html'),
        hash: true,
    });

    const styleLoader = [
        'css-loader',
        'postcss-loader',
        'sass-loader',
    ];

    const eslintRules = devMode ? {} : {
        'no-console': [2, { allow: ['warn', 'error'] }],
    };

    return {
        devtool: devMode
            ? 'cheap-eval-source-map'
            : 'hidden-source-map',
        resolve: { extensions: ['.js', '.jsx'] },
        context: resolve('src'),
        entry: './index.js',
        watch: devMode,
        watchOptions: {
            ignored: /(node_modules)/,
            aggregateTimeout: 300,
            poll: 500,
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        failOnError: prodMode,
                        rules: eslintRules,
                    },
                },
                {
                    exclude: /node_modules/,
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                },
                {
                    exclude: /node_modules/,
                    test: /\.s*css$/,
                    use: bundleCss.extract(styleLoader),
                },
                {
                    exclude: /node_modules/,
                    test: /\.(png|jpg)$/,
                    use: 'file-loader?name=[path][name].[ext]',
                },
                {
                    exclude: /node_modules/,
                    test: /\.json$/,
                    use: 'file-loader?name=data/[name].[ext]',
                },
                {
                    exclude: /node_modules/,
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: 'file-loader?name=fonts/[name].[ext]',
                },
                {
                    exclude: /node_modules/,
                    test: /robots\.txt$/,
                    use: 'file-loader?name=robots.txt',
                },
            ],
        },
        output: {
            filename: '[name].js',
            path: publicPath,
            publicPath: '/',
        },
        plugins: [
            htmlSinglePage
        ],
        devServer: {
            contentBase: publicPath,
            host: '0.0.0.0',
            port: 9000,
            stats: 'minimal',
            historyApiFallback: true,
        },
    };


};

module.exports = config;