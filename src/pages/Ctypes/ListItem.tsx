/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 16:23:51
 * @LastEditTime: 2022-03-16 16:33:26
 */
import React from "react";
import { ICTypeWithMetadata } from "../../types/ctypes";

import "./ListItem.scss";

interface Props {
  index: number;
  data: ICTypeWithMetadata;
}

const ListItem: React.FC<Props> = ({ index, data }) => {
  return (
    <li className="ctypes-list-item">
      <div className="index">{index + 1}</div>
      <div className="index">{data.metadata.title}</div>
      <div className="owner">{data.ctypeHash}</div>
    </li>
  );
};
export default ListItem;
