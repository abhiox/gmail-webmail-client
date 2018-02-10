var webpack = require('webpack');
var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: {
		bundle: './src/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				// use: ['style-loader', 'css-loader'],
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					loader: 'css-loader'
				}),
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html'
		}),

		new ExtractTextPlugin('style.[contenthash].css'),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};

module.exports = config;