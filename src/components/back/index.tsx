/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 15:47:14
 * @LastEditTime: 2022-01-05 15:59:14
 */
import React from "react";
import classNames from "classnames";
import backImg from "../../images/back.svg";

import "./index.scss";

interface Props {
  className?: string;
}

function Back({ className = "" }: Props): JSX.Element {
  const classes = classNames("back-components", className);

  return (
    <div className={classes}>
      <img src={backImg} alt="back" className="img" />
      <span>BACK</span>
    </div>
  );
}

export default Back;
