/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 17:13:19
 * @LastEditTime: 2022-03-25 16:15:55
 */
import React from "react";
import { Input, Form } from "antd";
import BackBtn from "./BackBtn";
import Button from "../../components/Button";
import { useToggleErrorModal } from "../../state/application/hooks";

import "./CreatePassword.scss";

type Props = {
  password: string;
  handleClick: () => void;
  handleBack: () => void;
};

const ComfirmPassword: React.FC<Props> = ({
  password,
  handleClick,
  handleBack,
}) => {
  const toggleErrorModal = useToggleErrorModal();

  const onFinish = (values: any) => {
    if (values.password === password) {
      handleClick();
    } else {
      toggleErrorModal();
    }
  };

  return (
    <div className="createPassword">
      <div className="tip">
        Master password is the only key to access/retrieve your local storage
        including all your secret keys and claims. Please enter your master
        password.
      </div>
      <Form colon={false} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Enter Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Please input" className="pwd-input" />
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
export default ComfirmPassword;
