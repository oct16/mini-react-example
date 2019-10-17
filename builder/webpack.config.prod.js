const webpackConfig = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const productionConfig = {
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'src/assets',
                to: 'assets/'
            }
        ])
    ],
    optimization: {
        minimize: true
    }
}

module.exports = merge(webpackConfig, productionConfig)
