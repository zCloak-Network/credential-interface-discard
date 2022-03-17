/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-06 11:23:24
 * @LastEditTime: 2022-03-16 22:19:43
 */

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./pages/App";

import "antd/dist/antd.css";
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
