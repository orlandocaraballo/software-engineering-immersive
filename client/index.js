import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.jsx";
import { TitleProvider } from "./context/Title.jsx";

ReactDOM.render(
  <Router>
    <TitleProvider>
      <App />
    </TitleProvider>
  </Router>,
  document.getElementById("root")
);
