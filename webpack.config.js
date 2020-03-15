const path = require('path');
module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".js"]
	},
	module: {
		rules: [{ test: /\.ts$/, loader: "ts-loader" }]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: false,
		port: 3000
	}
}
