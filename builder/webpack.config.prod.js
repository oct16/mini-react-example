const webpackConfig = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

webpackConfig.plugins.unshift(
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
        {
            from: 'src/assets',
            to: 'assets/'
        }
    ])
)
module.exports = webpackConfig
