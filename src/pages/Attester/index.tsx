/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 14:42:05
 * @LastEditTime: 2022-03-29 14:46:49
 */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import ContentLayout from "../../components/ContentLayout";
import AttesterGate from "../AttesterGate";

import "./index.scss";

const MENU = [
  {
    title: "Attestions",
    key: "attestions",
    url: "/attester/attestations",
  },
  {
    title: "CTYPEs",
    key: "ctypes",
    url: "/attester/attestations/ctypes",
  },
];

const MODOLE = [
  {
    title: "Attester",
    key: "attester",
    url: "/attester/attestations",
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

  useEffect(() => {
    if (location.pathname) {
      const module = MENU.find((it) => location.pathname === it.url)?.key;
      if (module) setModule(module);
    }
  }, [location]);

  return (
    <ContentLayout menu={MODOLE}>
      <AttesterGate>
        <div className="attester">
          <div className="attester-header">
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
      </AttesterGate>
    </ContentLayout>
  );
};

export default Attester;
