import path from 'path';
import express from 'express';

import compression from 'compression';
import morgan from 'morgan';
import exphbs from 'express-handlebars';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { match, RouterContext } from 'react-router';

import appRoutes from '../app/routes';
import reducers from '../app/reducers/index';

/**
 * CONFIGURATION CONSTANTS
 */
const COMPRESSION_THRESHOLD = 512;
const HOST = 'localhost';
const PORT = 8000;
const BASE_PATH = '/'
const ROOT = `../public${BASE_PATH}`;

const TEMPLATE_ROOT = 'views';
const TEMPLATE_LAYOUTS = 'views/layouts';

/**
 * EXPRESS APP
 */
const app = express();

/**
 * CONFIGURATION
 */
app.disable('x-powered-by');
app.engine('handlebars', exphbs({
  defaultLayout: 'index',
  layoutsDir: path.resolve(__dirname, TEMPLATE_LAYOUTS)
}));
app.set('views', path.resolve(__dirname, TEMPLATE_ROOT));
app.set('view engine', 'handlebars');

/**
 * COMPRESSION
 */
app.use(compression({ threshold: COMPRESSION_THRESHOLD }));

/**
 * LOGGING
 */
app.use(morgan('common'));

/**
 * PREVENTING CACHE
 */
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

/**
 * STATIC ASSETS
 */
app.use(`${BASE_PATH}js`, express.static(path.resolve(__dirname, ROOT, 'js')));

/**
 * ROUTER
 */
const router = express.Router();

const INITIAL_STATE = {
  list: [
    { id: 1, title: 'First', description: 'The description for the first item' },
    { id: 2, title: 'Second', description: 'The description for the second item' },
    { id: 3, title: 'Third', description: 'The description for the third item' }
  ]
}

export const store = createStore(reducers, INITIAL_STATE);

router.get('*', (req, res) => {
  match({ routes: appRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.render('main', {
        content,
        preloadedState: JSON.stringify(store.getState() || {})
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

// MAIN ROUTE
app.use(BASE_PATH, router);

app.listen(PORT, () => console.log(`Listening on http://${HOST}:${PORT}`));
