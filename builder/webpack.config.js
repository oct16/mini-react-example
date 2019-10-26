const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist/mini-react')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff\d?|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/')
        },
        extensions: ['.tsx', '.ts', '.js', '*']
    }
}
