/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-25 16:03:32
 * @LastEditTime: 2022-03-31 17:00:03
 */
import React from "react";
import { Form, Input, Radio, InputNumber } from "antd";
import { ICTypeInputProperty } from "../../types/ctypes";

import "./PropertyInput.scss";

interface Props {
  data: ICTypeInputProperty;
}

const PropertyInput: React.FC<Props> = ({ data }) => {
  const title = data.title;

  const returnComponent = () => {
    if (data.type === "integer") {
      return <InputNumber />;
    }

    if (data.type === "boolean") {
      return (
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      );
    }

    return <Input />;
  };

  return (
    <Form.Item
      label={title}
      name={title}
      className="content-item"
      rules={[
        {
          required: true,
          message: `Please input your ${title}!`,
        },
      ]}
    >
      {returnComponent()}
    </Form.Item>
  );
};
export default PropertyInput;
