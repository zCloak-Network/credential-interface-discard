/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-15 18:20:41
 * @LastEditTime: 2022-03-16 11:06:08
 */
import React from "react";
import Header from "../Header";

import "./index.scss";

interface Props {
  children: React.ReactNode;
  menu: any;
}

const ContentLayout: React.FC<Props> = ({ menu, children }) => {
  return (
    <div className="contentLayout">
      <Header menu={menu} />
      <div>{children}</div>
    </div>
  );
};
export default ContentLayout;
