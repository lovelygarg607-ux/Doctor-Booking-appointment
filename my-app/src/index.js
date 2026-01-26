import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/form.css";
import App from "./App";


import {

  RouterProvider,

} from "react-router-dom";


import { Provider } from "react-redux"
import Store from "./reducers/store.js";
import router from "./router.js";







const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>

);


