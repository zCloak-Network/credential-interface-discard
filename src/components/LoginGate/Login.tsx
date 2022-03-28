/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-21 20:33:30
 * @LastEditTime: 2022-03-28 23:45:15
 */
import React from "react";
import Button from "../Button";
import { Input, Form } from "antd";
import HomeLayout from "../HomeLayout";
import { PersistentStore } from "../../state/PersistentStore";
import { useToggleErrorModal } from "../../state/application/hooks";

type Props = {
  submit: (password: string) => void;
};

const Login: React.FC<Props> = ({ submit }) => {
  const [form] = Form.useForm();
  const toggleErrorModal = useToggleErrorModal();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      submit(values.password);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const children = (
    <div>
      <div className="title">Welcome to zCloak Credential Center</div>
      <div className="sub-title">Login to your account.</div>
      <Form form={form} colon={false} layout="vertical" validateTrigger="">
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              validator: async (_, value) => {
                const decrypted = await PersistentStore.decrypt(value);
                if (!decrypted) {
                  return Promise.reject(new Error("Password does not match."));
                }
              },
            },
          ]}
        >
          <Input.Password className="login-pwd-input" />
        </Form.Item>
        <Button type="primary" className="login-btn" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
      <div
        className="reset-btn"
        onClick={() => {
          toggleErrorModal();
        }}
      >
        Forget password?
      </div>
    </div>
  );

  return (
    <div className="login">
      <HomeLayout>{children}</HomeLayout>
    </div>
  );
};

export default Login;
