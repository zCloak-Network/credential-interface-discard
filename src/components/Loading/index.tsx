/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-07 14:08:18
 * @LastEditTime: 2022-03-29 15:06:19
 */
import React from "react";
import loading from "../../images/loading_1.gif";

import "./index.scss";

type Props = {
  messgage?: string;
};

export default function Loading({ messgage }: Props): JSX.Element {
  return (
    <div className="loading-components">
      <img src={loading} alt="loading" />
      {messgage && <div className="message">{messgage}</div>}
    </div>
  );
}
