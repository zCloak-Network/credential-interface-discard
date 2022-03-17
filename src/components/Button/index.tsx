/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-29 16:15:23
 * @LastEditTime: 2022-02-23 21:06:25
 */
import React from "react";
import classNames from "classnames";

import Loading from "../../images/loading.gif";

import "./index.scss";

interface Props {
  type?: any;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
}

// TODO
// const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');

export default function Button({
  type = "default",
  disabled = false,
  loading,
  onClick,
  htmlType = "button",
  className,
  children,
}: Props): JSX.Element {
  const classes = classNames(
    "button-components",
    {
      disabled: disabled,
      [`button-components-${type}`]: type,
    },
    className
  );

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) {
      onClick(e);
    }
  };

  if (loading) {
    return (
      <div className="button-components loading">
        Loading
        <img src={Loading} />
      </div>
    );
  }

  return (
    <button onClick={handleClick} className={classes} type={htmlType}>
      {children}
    </button>
  );
}
