const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_DEV === 'development';

module.exports = {
	entry: ['@babel/polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: dev ? '[name].js' : '[name].[hash].js',
		assetModuleFilename: 'assets/[name][hash][ext]',
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	optimization: {
		runtimeChunk: 'single',
	},
	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: !dev,
			},
		}),
		new HtmlWebpackPlugin({
			filename: 'form.html',
			template: './src/form.html',
			minify: {
				collapseWhitespace: !dev,
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(gif|svg|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
};
