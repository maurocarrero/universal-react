import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Main from './containers/Main';
import ConnectedDetail from './containers/ConnectedDetail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main}/>
    <Route path="/item/:id" component={ConnectedDetail}/>
  </Route>
);
