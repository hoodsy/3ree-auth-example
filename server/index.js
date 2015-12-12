import React from 'react';
import { renderToString } from 'react-dom/server';

import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose,
         createStore,
         applyMiddleware } from 'redux';
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react';

import App from '../common/views/containers/App';
import anchorApp from '../common/state/reducers/reducers';
import configureStore from '../common/state/stores/configureStore';

export default function initialRender(req, res) {
  // Create a new Redux store instance
  var initialState = {lists: [{text: 'testList', todos: [{text: 'testIt', completed: false}]}] };
  const store = configureStore(anchorApp, initialState);

  // Render the component to a string
  const html = renderToString(
    <div>
      <Provider store={store}>
        <App />
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  );

  // Send the rendered page back to the client with the initial state
  res.render('index', { html: html, initialState: JSON.stringify(store.getState()) });
}
