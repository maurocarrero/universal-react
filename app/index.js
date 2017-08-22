import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory as history, match } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index';
import routes from './routes';

const ROOT = document.querySelector('#app');
const PRELOADED_STATE = (window && window.PRELOADED_STATE) || {};

export const store = createStore(reducers, PRELOADED_STATE);

match({ routes, history }, (error, redirectLocation, renderProps) => {
  ReactDOM.render((
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>
  ), ROOT);
});
