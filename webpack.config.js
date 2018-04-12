var webpack = require("webpack");
 
module.exports = {
    entry: ["whatwg-fetch", "./src/app.js"],
    output: {
        publicPath: "/bundles/",
        filename: "./bundle.js"
    },

    mode: 'production',
   	


    module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    }
	  ]
	}
};