import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import "@/style/index.css"

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "@/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
