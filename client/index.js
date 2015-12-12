import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react';
import { createStore } from 'redux';

import App from '../common/views/containers/App';
import todoApp from '../common/state/reducers/reducers';
import configureStore from '../common/state/stores/configureStore';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(todoApp, initialState);
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
