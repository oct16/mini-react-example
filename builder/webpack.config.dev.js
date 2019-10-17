const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

const devConfig = {
    mode: 'development',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        open: true,
        historyApiFallback: true,
        stats: 'errors-only'
    }
}

module.exports = merge(webpackConfig, devConfig)
