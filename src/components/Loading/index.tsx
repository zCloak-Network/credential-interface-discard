/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-07 14:08:18
 * @LastEditTime: 2022-01-07 14:25:30
 */
import React from "react";
import loading from "../../images/loading_1.gif";

import "./index.scss";

export default function Loading(): JSX.Element {
  return (
    <div className="loading-components">
      <img src={loading} alt="loading" />
    </div>
  );
}
