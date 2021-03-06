var fs = require('fs')
var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  // keep node_module paths out of the bundle
  externals: [nodeExternals({
        // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
        whitelist: ['preact', 'preact-compat', 'react', 'react-dom']
    })],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  },
  resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
  }
}


  // // keep node_module paths out of the bundle
  // externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
  //   'react-dom/server', 'react/addons'
  // ]).reduce(function (ext, mod) {
  //   ext[mod] = 'commonjs ' + mod
  //   return ext
  // }, {}),
