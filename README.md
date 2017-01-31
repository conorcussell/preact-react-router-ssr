#### Preact + Preact Compat + React Router SSR

I've been trying to get Preact to play nice with React Router and Server Side Rendering. Not sure whether I'm facing a config issue, or Preact/React Router compatibility issue.

I've adapted the SSR tutorial from [react router tutorial](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering) to use Preact [via webpack](https://github.com/developit/preact-compat#usage-with-webpack) on the client.

But the Server Side Rendering is the issue.

```
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {

    const appHtml = renderToString(<RouterContext {...props}/>);

    console.log(appHtml); // this is just an empty div.

    res.send(renderPage(appHtml));
  });
});
```

This is using `react-dom/server` `renderToString`, which works fine with React, but returns an empty `<div>` when using Preact

I'm unsure whether my setup for transpiling the server code is correctly set up, I'm including `preact` + `preact-compat` using [`webpack-node-externals`](https://github.com/frostney/webpack-node-externals). Using this config

```
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
        // this WILL include `preact`, `preact-compat`, `react` and `react-dom` in the bundle, which allows it to alias correctly
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
```

This seems to work in terms of aliasing React/React DOM - as preact-compat/server and preact show up in the server bundle, but the actual rendering of the app using RouterContext just results in an empty div.
