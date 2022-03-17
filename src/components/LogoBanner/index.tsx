/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 14:43:43
 * @LastEditTime: 2022-03-09 14:46:11
 */
import React from "react";
import logo from "../../images/logo_2.svg";

import "./index.scss";

const LogoBanner: React.FC = () => {
  return (
    <div className="logoBanner">
      <img className="login-logo" src={logo} alt="logo" />
      <span>zCloak Network</span>
    </div>
  );
};
export default LogoBanner;
