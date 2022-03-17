/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-06 14:35:38
 * @LastEditTime: 2022-01-06 18:30:30
 */
import React from "react";
import { Input } from "antd";
import classNames from "classnames";

import iconSearch from "../../images/icon_search.png";

import "./index.scss";

interface Props {
  className?: string;
  onChange?: (e) => void;
}

export default function Search({
  className = "",
  onChange,
}: Props): JSX.Element {
  const classes = classNames("search-components", className);

  return (
    <div className={classes}>
      <Input
        onChange={(e) => {
          onChange(e);
        }}
        placeholder="Search"
        prefix={<img src={iconSearch} className="icon-search" />}
        className="header-search"
      />
    </div>
  );
}
