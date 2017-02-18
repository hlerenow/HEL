var webpack = require("webpack");
var path = require("path");
var productionPath=path.join(__dirname, "/");
var HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports = {
	entry: {
		index: path.join(__dirname,"src/index.js"),
	},
	devtool: false,
	output: {
		path: productionPath,
		// publicPath: path.join(__dirname, "../public"),
		filename: './[name].js',
		chunkFilename: 'js/[name].[id].js'
	},
	externals:{
		jQuery: 'window.$',
		editormd:"window.editormd"
	},	
	resolve: {
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, "node_modules")],
	    alias: {
	      'src': path.join(__dirname, 'src'),
	      'assets': path.join(__dirname, 'src/assets'),
	      'views': path.join(__dirname, 'src/views'),
	      'routes': path.join(__dirname, 'src/routes'),
	      'store': path.join(__dirname, 'src/store'),
	      'components': path.join(__dirname, 'src/components')
	    }		
	},
	resolveLoader: {
		fallback: [path.join(__dirname, "node_modules")]
	},	
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue',
				option:{
					postcss:[require("autoprefixer")]
				}
			}, 
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, 
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			}, 
			{
				test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
				loader: 'file-loader',
				query: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin("**********Created By HL ;*********\n"),	
		new HtmlWebpackPlugin({
			filename: path.join(__dirname,"index.html"),
			template: path.join(__dirname , "src/index_tmp.html"),
			inject: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]	
}