import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

// react notifications
import { Provider as AlertProvider } from "react-alert";

//redux
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import logger from "redux-logger";

//reducer
import rootReducer from "./redux/reducers";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={<div></div>}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
