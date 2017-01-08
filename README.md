#### Preact + Preact Compat + React Router SSR

I've been trying to get Preact to play nice with React Router and Server Side Rendering. Not sure whether I'm facing a Webpack issue, or Preact/React Router issue.

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

This
