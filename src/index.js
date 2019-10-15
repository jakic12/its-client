import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";

//redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

//reducer
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
