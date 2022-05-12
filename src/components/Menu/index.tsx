/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 14:56:01
 * @LastEditTime: 2022-03-16 15:45:04
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import "./index.scss";

interface Props {
  className?: string;
  menu: any;
}

export default function Menu({ menu, className }: Props): JSX.Element {
  const navigate = useNavigate();
  const [module, setModule] = useState(menu[0].key);

  const classes = classNames("menu-components", className);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  useEffect(() => {
    if (location.hash) {
      const module = menu.find((it) => location.hash.includes(it.url))?.key;
      if (module) setModule(module);
    }
  }, []);

  return (
    <ul className={classes} onClick={handleClick}>
      {menu.map((it) => (
        <li
          key={it.key}
          data-id={it.key}
          data-url={it.url}
          className={module === it.key ? "active" : ""}
        >
          {it.title}
        </li>
      ))}
    </ul>
  );
}
