import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { FilesContextProvider } from "./hooks/useFiles";

ReactDOM.render(
  <React.StrictMode>
    <FilesContextProvider>
      <App />
    </FilesContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
