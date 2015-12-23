import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react';

import { getLists,
         getResources } from './api/service/list';
import App from '../common/views/containers/App';
import anchorApp from '../common/state/reducers/reducers';
import configureStore from '../common/state/stores/configureStore';

export default function initialRender(req, res) {
  getLists()
  .then(initialLists => {
    // console.log(test);
    console.log(initialLists);
    // initialLists[0].then(obj => console.log(obj))
  // .then(initialLists => getResources(initialLists))
    const initialState = { lists: initialLists };
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
    res.render('index',
      {
        initialState: JSON.stringify(store.getState()),
        html,
      }
    );
  });
}
