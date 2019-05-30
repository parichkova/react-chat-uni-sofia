import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  // https://github.com/zalmoxisus/redux-devtools-extension

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
}

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(),
    ),
);

ReactDOM.render(
    <Provider store={store} >
        <App/>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
