const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DIST_FILE_PATH = path.resolve(__dirname, '../dist/')

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: '[name].[hash].js',
        path: DIST_FILE_PATH
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/')
        },
        extensions: ['.tsx', '.ts', '.js', '*']
    }
}
