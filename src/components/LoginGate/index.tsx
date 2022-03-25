/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-21 20:28:29
 * @LastEditTime: 2022-03-25 17:00:08
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { PersistentStore } from "../../state/PersistentStore";
import { useToggleErrorModal } from "../../state/application/hooks";

import "./index.scss";

type Props = {
  handlePassword: (pwd: string) => void;
};

const LoginGate: React.FC<Props> = ({ handlePassword }) => {
  const navigate = useNavigate();

  const toggleErrorModal = useToggleErrorModal();

  const login = async (newPassword: string): Promise<void> => {
    const decrypted = await PersistentStore.decrypt(newPassword);
    if (!decrypted) {
      return toggleErrorModal();
    }
    handlePassword(newPassword);
    navigate("/user");
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
