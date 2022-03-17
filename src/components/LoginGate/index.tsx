/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-21 20:28:29
 * @LastEditTime: 2022-03-16 15:47:03
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Login from "./Login";
import Button from "../../components/Button";
import Register from "./Register";
import { PersistentStore } from "../../state/PersistentStore";

import "./index.scss";
type Props = {
  handlePassword: (pwd: string) => void;
};

const LoginGate: React.FC<Props> = ({ handlePassword }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (newPassword: string): Promise<void> => {
    if (!newPassword) {
      setErrorMessage("Please, enter a password");
      return setError(true);
    }
    const decrypted = await PersistentStore.decrypt(newPassword);
    if (!decrypted) {
      setErrorMessage("Password does not match");
      return setError(true);
    }
    handlePassword(newPassword);
    navigate("/user");
  };

  const clear = (): void => {
    PersistentStore.clearLocalStorage();
    setErrorMessage("");
    setError(false);
    setPassword("");
  };

  if (!password) {
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
        {error && (
          <Modal
            width="424px"
            visible={true}
            title="Error"
            onCancel={() => setError(false)}
            wrapClassName="login-err-modal"
          >
            <p className="err-msg">{errorMessage}</p>
            <p className="err-tip">Forgotten your password?</p>
            <div className="centerDiv">
              <Button onClick={clear} className="clear-btn">
                Clear Storage
              </Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
};

export default LoginGate;
