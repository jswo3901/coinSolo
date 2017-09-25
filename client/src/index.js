import React from 'react';
import ReactDOM from 'react-dom';
// 리덕스
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import App from './App'
import registerServiceWorker from './registerServiceWorker';

//스토어 임시경로
import reducers from './App/controller';
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,document.getElementById('root')
);

registerServiceWorker();
