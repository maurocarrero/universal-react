import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Main from './containers/Main';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main}/>
    <Route path="item/:id" getComponent={(nextState, cb) => {
      // Server side check, since require.ensure will not work there and we will
      // render the component synchronously.
      if (typeof (require.ensure) === 'function') {
        require.ensure([], function (require) {
          cb(null, require('./containers/ConnectedDetail').default);
        });
      } else {
        cb(null, require('./containers/ConnectedDetail').default);
      }
    }}/>
  </Route>
);
