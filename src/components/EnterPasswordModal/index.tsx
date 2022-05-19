/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-29 17:29:52
 * @LastEditTime: 2022-05-18 18:53:07
 */
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { Input, Form } from "antd";
import { PersistentStore } from "../../state/PersistentStore";

import "./index.scss";

type Props = {
  visible: boolean;
  handleCancel: () => void;
  handleSubmit: (e?: any) => void;
  resetPassword: () => void;
  createLoading?: boolean;
};

const EnterPasswordModal: React.FC<Props> = ({
  visible,
  resetPassword,
  handleSubmit,
  handleCancel,
  createLoading = false,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

  const handleClick = async () => {
    try {
      await form.validateFields();
      handleSubmit();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      setError(true);
    }
  };

  const handleClear = (): void => {
    PersistentStore.clearLocalStorage();
    resetPassword();
  };

  const handleChange = () => {
    if (error) {
      setError(false);
    }
  };

  useEffect(() => {
    setError(false);
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal
      width="678px"
      visible={visible}
      title="Enter Password"
      onCancel={handleCancel}
      wrapClassName="enter-password-modal"
    >
      <Form
        form={form}
        colon={false}
        layout="vertical"
        validateTrigger=""
        onValuesChange={handleChange}
      >
        <Form.Item
          name="password"
          label="Password"
          validateStatus={`${error ? "error" : ""}`}
          help={`${error ? "Password does not match." : ""}`}
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
        <Button
          type="primary"
          className="submit-btn"
          onClick={handleClick}
          disabled={error}
          loading={createLoading}
        >
          {createLoading ? "It may take you 30-60s " : "Submit"}
        </Button>
        {error && (
          <Button
            danger
            type="primary"
            className="reset-btn"
            onClick={handleClear}
          >
            Forget password? Clear Storage
          </Button>
        )}
      </Form>
    </Modal>
  );
};
export default EnterPasswordModal;
