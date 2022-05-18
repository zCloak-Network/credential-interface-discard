/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 17:13:19
 * @LastEditTime: 2022-05-13 16:24:12
 */
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import BackBtn from "./BackBtn";
import { Input, Form } from "antd";

import "./Confirm.scss";

type Props = {
  handleClick: () => void;
  handleBack: () => void;
  mnemonic: string[];
};

type PropsItem = {
  data: number;
  aimData: string;
};

const ConfirmItem = ({ data, aimData }: PropsItem) => {
  return (
    <Form.Item
      label={`#${data}`}
      name={data}
      rules={[
        {
          validator: async (_, value) => {
            if (value !== aimData) {
              return Promise.reject(new Error("Incorrect answer"));
            }
          },
        },
      ]}
    >
      <Input placeholder="Please input" className="confirm-input" />
    </Form.Item>
  );
};

const Confirm: React.FC<Props> = ({ handleBack, handleClick, mnemonic }) => {
  const [random, setRandom] = useState<number[]>([]);
  const [form] = Form.useForm();

  const getRandom = () => {
    const result: number[] = [];
    const originalArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (let i = 0; i < 4; ++i) {
      const random = Math.floor(Math.random() * originalArr.length);
      if (result.includes(originalArr[random])) {
        continue;
      }
      result.push(originalArr[random]);
      originalArr.splice(random, 1);
    }
    return result;
  };

  const handleContinue = async () => {
    try {
      await form.validateFields();
      handleClick();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  useEffect(() => {
    const data = getRandom();
    setRandom(data);
  }, []);

  return (
    <div className="register-confirm">
      <div className="tip">
        Please confirm your secret recovery phrase by filling in the correct
        word for each position.
      </div>
      <Form
        form={form}
        colon={false}
        layout="vertical"
        className="confirm-form"
        validateTrigger=""
      >
        {random.map((it) => (
          <ConfirmItem data={it} key={it} aimData={mnemonic[it - 1]} />
        ))}
      </Form>
      <div className="footer">
        <BackBtn onClick={handleBack} />
        <Button className="create-btn" type="primary" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
export default Confirm;
