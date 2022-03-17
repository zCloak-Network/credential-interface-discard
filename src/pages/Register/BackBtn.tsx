/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 17:22:09
 * @LastEditTime: 2022-03-14 17:31:03
 */
import React from "react";
import classNames from "classnames";

import "./BackBtn.scss";

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const BackBtn: React.FC<Props> = ({ onClick, disabled = false, className }) => {
  const classes = classNames(
    "backBtn",
    {
      disabled: disabled,
    },
    className
  );

  return (
    <span
      className={classes}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <i className="iconfont icon_left"></i>
      Go Back
    </span>
  );
};
export default BackBtn;
