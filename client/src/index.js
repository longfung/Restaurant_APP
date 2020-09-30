import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./i18n";
import { ThemeProvider } from "@material-ui/core"
import theme from "./theme.js"
import "bootstrap/dist/css/bootstrap.css";

debugger;
ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
