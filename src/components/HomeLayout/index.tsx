/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-07 21:58:29
 * @LastEditTime: 2022-05-13 13:53:13
 */
import React from "react";
import login from "../../images/login.svg";
import LogoBanner from "../LogoBanner";

import "./index.scss";
interface IProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<IProps> = ({ children }) => {
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
