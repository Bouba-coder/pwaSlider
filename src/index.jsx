import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppStateContextProvider } from "./context/app-state-context";
import { ModalProvider } from "./context/modal-context/modal-context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { LoadingProvider } from "./context/loader-context";

ReactDOM.render(<AppStateContextProvider>
    <LoadingProvider>
  <ModalProvider>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </ModalProvider>
  </LoadingProvider>
</AppStateContextProvider>, document.getElementById("root"));

