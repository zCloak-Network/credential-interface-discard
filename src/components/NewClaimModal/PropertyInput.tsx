/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-25 16:03:32
 * @LastEditTime: 2022-03-24 14:13:47
 */
import React from "react";
import { Form, Input, InputNumber } from "antd";
import { ICTypeInputProperty } from "../../types/ctypes";

import "./PropertyInput.scss";

interface Props {
  data: ICTypeInputProperty;
}

const PropertyInput: React.FC<Props> = ({ data }) => {
  const title = data.title;

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
      {data.type === "integer" ? <InputNumber /> : <Input />}
    </Form.Item>
  );
};
export default PropertyInput;
