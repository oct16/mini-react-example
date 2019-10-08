const webpackConfig = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
        minimizer: [new UglifyJsPlugin()]
    }
}
merge(webpackConfig, productionConfig)

module.exports = webpackConfig
