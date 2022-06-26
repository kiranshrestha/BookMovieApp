import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "typeface-roboto";
import registerServiceWorker from "./registerServiceWorker";
import Controller from "./screens/Controller";
import store from "./store/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Controller />
  </Provider>
);
registerServiceWorker();
