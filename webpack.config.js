const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoPrefixer = require('autoprefixer');

module.exports = env => {
	console.info('NODE ENV: ', env.NODE_ENV);
	console.info('Environment Type: ', env);
	return {
		mode: env,
		entry: ['./src/index.js', './src/index.scss'],
		devtool: 'inline-source-map',
		devServer: {
			contentBase: false,
			historyApiFallback: true,
			// compress:true,
			port: 9500,
			// publicPath: path.resolve(__dirname, 'dist'),
			writeToDisk: true
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				title: 'Output Management - Test',
				template: 'src/index.ejs'
			})
		],
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: 'bundle.css'
						}
					}, {
						loader: 'extract-loader'
					}, {
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: ['./node_modules']
						}
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoPrefixer()]
						}
					}]
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						'file-loader'
					]
				}
			]
		}
	}

};