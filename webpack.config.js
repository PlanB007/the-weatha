// var path = require('path');
// var webpack = require('webpack')

// module.exports = {
//   entry: './src/app.jsx',

//   output: {
//     path: path.join(__dirname, './dist'),
//     filename: 'bundle.js'
//   },

//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       exclude: /node_modules/,
//       loader: 'babel',
//       query: {
//         presets: ['es2015', 'react']
//       },
//     }, {
//       test: /\.styl$/, 
//       loader: 'style-loader!css-loader!stylus-loader?name=/assets/styles/[name].[ext]'
//     }, {
//       test: /\.(jpe?g|png|gif|svg)$/i,
//       loader: "file-loader?name=/assets/images/[name].[ext]"
//     }]
//   }
// };


module.exports = {
	output: {
		filename: './bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}