const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const devConfig = {
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        open: true,
        openPage: 'mini-react',
        historyApiFallback: true,
        stats: 'errors-only'
    }
}

module.exports = merge(webpackConfig, devConfig)
