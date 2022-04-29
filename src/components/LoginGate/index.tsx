/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-21 20:28:29
 * @LastEditTime: 2022-04-29 11:33:40
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import useRole from "../../hooks/useRole";
import { PersistentStore } from "../../state/PersistentStore";

import "./index.scss";

type Props = {
  handlePassword: (pwd: string) => void;
};

const LoginGate: React.FC<Props> = ({ handlePassword }) => {
  const navigate = useNavigate();
  const isClaimer = useRole();

  const login = async (newPassword: string): Promise<void> => {
    handlePassword(newPassword);
    if (isClaimer) {
      navigate("/credential/user/claims");
    } else {
      navigate("/credential/attester/attestations");
    }
  };

  const state = PersistentStore.getLocalState();
  const salt = PersistentStore.getLocalSalt();

  if (!state || !salt) {
    return (
      <div className="login-gate">
        <div className="login-box">
          <Register />
        </div>
      </div>
    );
  }

  return (
    <div className="login-gate">
      <div className="login-box">
        <Login submit={login} />
      </div>
    </div>
  );
};

export default LoginGate;
