/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-07 21:58:29
 * @LastEditTime: 2022-04-02 14:13:11
 */
import React from "react";
import login from "../../images/login.svg";
import LogoBanner from "../LogoBanner";

import "./index.scss";

const HomeLayout: React.FC = ({ children }) => {
  return (
    <div className="homeLayout">
      <LogoBanner />
      <div className="content">
        <div>{children}</div>
        <div>
          <img className="login-img" src={login} alt="" />
        </div>
      </div>
    </div>
  );
};
export default HomeLayout;
