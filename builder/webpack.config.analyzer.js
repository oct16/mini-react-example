const webpackProdConfig = require('./webpack.config.prod')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')

const config = {
    plugins: [new BundleAnalyzerPlugin()]
}

module.exports = merge(webpackProdConfig, config)
