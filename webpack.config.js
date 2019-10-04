const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const publicPath = resolve('public/');

    const eslintRules = isDevelopment ? {} : {
        'no-console': [2, { allow: ['warn', 'error'] }],
    };

    return {
        devtool: isDevelopment ? 'inline-source-map' : '',
        resolve: { extensions: ['.js', '.jsx'] },
        context: resolve(__dirname, 'src'),
        entry: './index.js',
        watch: isDevelopment,
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
                        rules: eslintRules,
                    },
                },
                {
                    exclude: /node_modules/,
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                },
                {
                    test: /\.s*css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { sourceMap: isDevelopment }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => require('autoprefixer'),
                                    sourceMap: isDevelopment
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: { sourceMap: isDevelopment }
                            }
                        ]
                    })
                },
                {
                    exclude: /node_modules/,
                    test: /\.(png|jpg|svg)$/,
                    use: 'file-loader?name=[path][name].[ext]',
                },
                {
                    exclude: /node_modules/,
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: 'file-loader?name=fonts/[name].[ext]',
                }
            ],
        },
        output: {
            filename: '[name].js',
            path: publicPath,
            publicPath: '/',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: resolve('src/index.html')
            }),
            new ExtractTextPlugin('css/styles.css'),

        ]
    };


};

module.exports = config;