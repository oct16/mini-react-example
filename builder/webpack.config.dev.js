const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

webpackConfig.mode = 'development'
webpackConfig.devServer = {
    open: true,
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        publicPath: false
    }
}

module.exports = webpackConfig
