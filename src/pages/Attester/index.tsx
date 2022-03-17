/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 14:42:05
 * @LastEditTime: 2022-03-16 15:39:33
 */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import arrowDownInactiveImg from "../../images/icon_arrow_inactive.png";

import "./index.scss";

const MENU = [
  {
    title: "Attestions",
    key: "attestions",
    url: "/attester",
  },
  {
    title: "CTYPEs",
    key: "ctypes",
    url: "/attester/ctypes",
  },
];

const Attester: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [module, setModule] = useState(MENU[0].key);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (location.pathname) {
      const module = MENU.find((it) => location.pathname === it.url)?.key;
      if (module) setModule(module);
    }
  }, [location]);

  return (
    <div className="attester">
      <div className="attester-header">
        <div>
          <img
            src={arrowDownInactiveImg}
            className="back-btn"
            onClick={handleBack}
          />
          Attester
        </div>
        <ul className="menu" onClick={handleClick}>
          {MENU.map((it) => (
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
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Attester;
