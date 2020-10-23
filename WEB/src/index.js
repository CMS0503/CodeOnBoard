// @flow

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './apps/store/reducers/rootReducer'
import App from "./apps/App.react";
import configureStore from "./apps/redux/configureStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


const rootElement = document.getElementById("root");

const store = configureStore();
const persistor =persistStore(store)

//store={createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}
if (rootElement) {
  ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , rootElement);
} else {
  throw new Error("Could not find root element to mount to!");
}
