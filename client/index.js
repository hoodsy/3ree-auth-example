import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react';
import { createStore } from 'redux';

import { App } from '../common/views';
// import startSocketListener from './socketListener';
import resourceApp from '../common/state/reducers';
import * as actions from '../common/state/actions';
import configureStore from '../common/state/stores/configureStore';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(resourceApp, initialState);
const rootElement = document.getElementById('root');
render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  rootElement,
);

// startSocketListener(store, actions);
