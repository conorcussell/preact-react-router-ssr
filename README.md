#### Preact + Preact Compat + React Router SSR

I've been trying to get Preact to play nice with React Router and Server Side Rendering. Not sure whether I'm facing a config issue, or Preact/React Router compatibility issue.

I've adapted the SSR tutorial from [react router tutorial](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering) to use Preact [via webpack](https://github.com/developit/preact-compat#usage-with-webpack) on the client.

But the Server Side Rendering is the issue.

```
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {

    const appHtml = renderToString(<RouterContext {...props}/>);

    console.log(appHtml); // this is just [object Object]

    res.send(renderPage(appHtml));
  });
});
```

This is using `react-dom/server` `renderToString`, which works fine with React, but returns `[object Object]` when using Preact

I'm unsure whether my setup for transpiling the server code is correctly set up, I'm including `preact` + `preact-compat` as externals. Using this config

```
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
  // but include preact and preact-compat as externals
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'preact-compat', 'preact'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  }
}
```
