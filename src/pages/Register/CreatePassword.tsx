/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 17:13:19
 * @LastEditTime: 2022-03-10 11:54:39
 */
import React from "react";
import { Input, Form } from "antd";
import BackBtn from "./BackBtn";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

import "./CreatePassword.scss";

type Props = {
  handleClick: (e: any) => void;
};

const CreatePassword: React.FC<Props> = ({ handleClick }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };

  const onFinish = (values: any) => {
    handleClick(values);
  };

  return (
    <div className="createPassword">
      <div className="tip">
        Master password is the only key to access/retrieve your local storage
        including all your secret keys and claims. Never forget your master
        password.
      </div>
      <Form colon={false} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Enter Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "password must be at least 8 characters" },
          ]}
        >
          <Input.Password placeholder="Please input" className="pwd-input" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Please input"
            className="pwd-input-second"
          />
        </Form.Item>
        <div className="footer">
          <BackBtn onClick={handleBack} />
          <Button className="create-btn" type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default CreatePassword;
