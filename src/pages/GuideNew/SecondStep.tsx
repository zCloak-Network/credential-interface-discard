/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-10 22:25:04
 */
import React, { useState } from "react";
import FileSaver from "file-saver";
import { Form, Input, message } from "antd";
import Button from "../../components/Button";

const SecondStep: React.FC = () => {
  const [credentail, setCredentail] = useState();
  const [next, setNext] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    await setLoading(true);
    console.log("Success:", values);
    message.warning({
      content: "It may take you 30-60s",
      duration: 0,
    });
    await setLoading(false);
  };

  const handleDownload = async () => {
    const blob = await new Blob([JSON.stringify("3434343")], {
      type: "text/plain;charset=utf-8",
    });

    await FileSaver.saveAs(blob, "credential.json");
    await setNext(true);
  };

  const handleValuesChange = (changedValues, allValues) => {
    const allTrue = Object.values(allValues).every((it) => !!it);

    setDisabled(!allTrue);
  };

  return (
    <div className="step-wrapper">
      <div className="title">Get credential</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      {!credentail && (
        <>
          <Form
            name="basic"
            className="create-claim-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
            layout="vertical"
            onValuesChange={handleValuesChange}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Button
              className="btn"
              htmlType="submit"
              disabled={disabled}
              loading={loading}
            >
              Submit
            </Button>
          </Form>
        </>
      )}
      {!!credentail && (
        <div>
          <div></div>
          <div>
            <Button className="btn" onClick={handleDownload}>
              Download
            </Button>
            <Button className="btn" disabled={!next}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SecondStep;
