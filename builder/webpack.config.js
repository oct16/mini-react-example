const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist/mini-react')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
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
                test: /\.(styl|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff\d?|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[sha512:hash:base64:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.pug'),
            filename: 'index.html',
            title: 'Mini React Demo By © 2019 OCT16',
            meta: {
                'UTF-8': { charset: 'UTF-8' },
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }
            },
            env: process.env
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/')
        },
        extensions: ['.tsx', '.ts', '.js', '*']
    }
}
