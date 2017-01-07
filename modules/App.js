import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <div>
    <h1>Preact + React Router SSR</h1>
    <ul role="nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    {props.children}
  </div>
);
