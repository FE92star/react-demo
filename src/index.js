import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// import * as serviceWorker from './serviceWorker';

const AppStore = (
  <Provider store={ store }>
    <App />
  </Provider>
)

ReactDOM.render(AppStore, document.getElementById('root'));
