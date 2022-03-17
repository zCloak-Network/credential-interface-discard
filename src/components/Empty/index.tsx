/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-07 10:15:41
 * @LastEditTime: 2022-01-11 16:33:36
 */
import React from "react";
import classNames from "classnames";
import Button from "../../components/Button";
import NotFound from "../../images/not_found.png";

import "./index.scss";

interface Props {
  image?: string;
  type?: string;
  description?: string;
  className?: string;
  handleConnect?: () => void;
}

export default function Empty({
  image,
  className,
  type,
  description,
  handleConnect,
}: Props): JSX.Element {
  const classes = classNames("empty-components", className);

  return (
    <div className={classes}>
      <img src={image ?? NotFound} alt="empty" />
      <div>{description}</div>
      {type === "notConnected" && (
        <Button className="connect-btn" type="primary" onClick={handleConnect}>
          Connect wallet
        </Button>
      )}
    </div>
  );
}
