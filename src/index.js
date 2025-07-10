import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import RoutesHomeMenu from "./routes/RoutesHomeMenu";
import RoutesMenu from "./routes/RoutesMenu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <BrowserRouter>
     <Provider store={store}>
      <RoutesHomeMenu/>
      <RoutesMenu/>
     </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
