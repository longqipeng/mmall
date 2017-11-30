var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var getHtmlConfig = function(name) {
	return {
		   template: './src/view/'+name+'.html',
	  	   filename: 'view/' + name +'.html',
	  	   inject: 'body',
	  	   title: 'web app',
	  	   chunks: ['common',name]
	}
}

module.exports = {
	entry: {
		index: './src/page/index/index.js',
		login: './src/page/login/login.js',
		/*开启服务器*/
		common: ['./src/page/common/common.js', 'webpack-dev-server/client?http://localhost:8088/']
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist' /*开启服务器加路径才能自动刷新*/
	},	
	module: {
		rules: [
		    {
		      test: /\.js$/,
		      use: {
		      	   loader: 'babel-loader',
		      	   options: {
		      	   	   presets: ['env']
		      	   }
		      },
		      exclude:path.resolve(__dirname,'src'),
		   	  exclude:path.resolve(__dirname,'node_modules')
		    },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				        fallback: "style-loader",
				        use: "css-loader",
				        publicPath: "/dist"
	          })		
			},
			{
		        test:  /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
		        use: 'url-loader?limit=10240&name=[name].[ext]&outputPath=images/&publicPath=../'
		        /*use: {
		            loader: 'url-loader',
		            options: {
		              limit: 2,
		              name: 'images/[name].[ext]'
		            }
		        }*/
			}
		]
	},
	resolve: {
		 extensions: ['.js', '.vue', '.json'],
		alias: {
			node_modules: path.resolve(__dirname + '/node_modules'),
			util: path.resolve(__dirname + '/src/util/'),
			page: path.resolve(__dirname + '/src/page/'),
			view: path.resolve(__dirname + '/src/view/')
		}
	},
    plugins: [
          new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'js/base.js'
          }),
          new ExtractTextPlugin({
               filename: "css/[name].css"
          }),
          new htmlWebpackPlugin(getHtmlConfig('index')),
          new htmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
