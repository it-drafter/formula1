const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader'
                    ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    devtool : 'inline-source-map'
}