var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
module.exports = {
    context: path.join(__dirname, 'web', 'src'),
    entry: {
        "index": ['./entry.js'],
        "index.min": ['./entry.js']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    output: {
        path: path.join(__dirname, 'web', 'www', 'dist'),
        filename: '[name].js'
    },
    module: {
        // Disable handling of unknown requires
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // Disable handling of requires with a single expression
        //exprContextRegExp: /$^/,
        exprContextCritical: false,

        // Warn for every expression in require
        //wrappedContextCritical: true,
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
			{
				test:/\.less$/,
				loader:ExtractTextPlugin.extract('style-loader','raw-loader!less-loader')
			},
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min/,
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("[name].css")
    ]
};
