import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

const App = (props) => (
  <div>
    <h1>Preact + React Router SSR</h1>
    <ul role="nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    {props.children}
  </div>
);

const Home = (props) => <div>Home</div>;

const About = (props) => <div>About</div>;

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/about" component={About}/>
  </Route>
);
