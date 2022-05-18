/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 14:43:43
 * @LastEditTime: 2022-05-13 13:49:21
 */
import React from "react";
import classNames from "classnames";

import _logo from "../../images/logo_2.svg";

import "./index.scss";

type Props = {
  // add React.ReactDOM type for logo components
  logo?: string;
  className?: string;
};

const LogoBanner: React.FC<Props> = ({ logo, className }) => {
  const classes = classNames("logo-banner-components", className);

  return (
    <div className={classes}>
      <img className="login-logo" src={logo || _logo} alt="logo" />
      <span>zCloak Network</span>
    </div>
  );
};
export default LogoBanner;
