import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const AppStore = (
  <Provider store={ store }>
    <App />
  </Provider>
)

ReactDOM.render(AppStore, document.getElementById('root'));
