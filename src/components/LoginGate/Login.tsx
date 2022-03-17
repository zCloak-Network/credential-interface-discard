/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-21 20:33:30
 * @LastEditTime: 2022-03-16 22:18:19
 */
import React, { useState } from "react";
import Button from "../Button";
import { Input } from "antd";
import HomeLayout from "../HomeLayout";

type Props = {
  submit: (password: string) => void;
};

const Login: React.FC<Props> = ({ submit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    submit(password);
  };

  const children = (
    <div>
      <div className="title">Welcome to Credential</div>
      <div className="sub-title">Login to your account.</div>
      <Input.Password
        className="login-pwd-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="primary" className="login-btn" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );

  return (
    <div className="login">
      <HomeLayout>{children}</HomeLayout>
    </div>
  );
};

export default Login;
