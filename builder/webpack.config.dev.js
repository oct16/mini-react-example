const webpackConfig = require('./webpack.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devConfig = {
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        open: true,
        openPage: 'mini-react',
        historyApiFallback: true,
        stats: 'errors-only'
    }
}

module.exports = merge(webpackConfig, devConfig)
