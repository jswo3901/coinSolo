import React from 'react';
import ReactDOM from 'react-dom';
// 리덕스
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import App from './App'
import registerServiceWorker from './registerServiceWorker';

//스토어 임시경로
import reducers from './app/components/Bro/reducers';
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
