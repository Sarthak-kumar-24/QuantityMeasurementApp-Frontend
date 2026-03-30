import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css"; // global styles
import "./index.css"; // optional extra

import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./store/providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
