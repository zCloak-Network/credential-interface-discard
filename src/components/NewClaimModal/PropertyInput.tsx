/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-25 16:03:32
 * @LastEditTime: 2022-03-16 15:48:52
 */
import React from "react";
import { Form, Input } from "antd";
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
      <Input />
    </Form.Item>
  );
  // return (
  //   <div className="property-input">
  //     <div>{data.title}</div>
  //     <div>
  //       <Input type="text" />
  //     </div>
  //   </div>
  // );
};
export default PropertyInput;
