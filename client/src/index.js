import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { reducers } from './reducers';
import './assets/scss/index.scss';
import App from './App';
import Admin from './Admin';
const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);