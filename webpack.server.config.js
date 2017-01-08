var fs = require('fs')
var path = require('path')

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
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'preact-compat', 'preact'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

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
