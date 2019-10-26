const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackConfig = require('./webpack.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const productionConfig = {
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimize: true
    }
}

module.exports = merge(webpackConfig, productionConfig)
