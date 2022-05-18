/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-29 16:15:23
 * @LastEditTime: 2022-05-12 17:57:33
 */
import React from "react";
import classNames from "classnames";

import Loading from "../../images/loading.gif";

import "./index.scss";

interface Props {
  type?: any;
  size?: "large" | "default" | "small";
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

// TODO
// const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');

export default function Button({
  type = "default",
  disabled = false,
  loading = false,
  size = "large",
  onClick,
  htmlType = "button",
  className,
  children,
  style,
  danger = false,
}: Props): JSX.Element {
  const classes = classNames(
    "button-components",
    {
      disabled: disabled,
      [`button-components-${type}`]: type,
      "button-components-danger": danger,
    },
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onClick) {
      onClick(e);
    }
  };

  if (loading) {
    return (
      <div
        className={classNames("button-components", "loading", className)}
        style={style}
      >
        {size === "large" && (
          <span className="button-text">{children ? children : "Loading"}</span>
        )}
        <img src={Loading} alt="loading" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={classes}
      type={htmlType}
      style={style}
    >
      {children}
    </button>
  );
}
