import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./pages/App";

import "./styles/index.scss";

function Root(): React.ReactElement {
  return (
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
