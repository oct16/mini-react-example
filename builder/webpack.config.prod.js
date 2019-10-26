const webpackConfig = require('./webpack.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const productionConfig = {
    plugins: [new CleanWebpackPlugin()],
    optimization: {
        minimize: true
    }
}

module.exports = merge(webpackConfig, productionConfig)
