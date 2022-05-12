/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 16:23:51
 * @LastEditTime: 2022-04-01 11:38:08
 */
import React from "react";
import { ICTypeWithMetadata } from "../../types/ctypes";
import detailImg from "../../images/icon_detials.svg";

import "./ListItem.scss";

interface Props {
  index: number;
  data: ICTypeWithMetadata;
  handleDetail: (data) => void;
}

const ListItem: React.FC<Props> = ({ index, data, handleDetail }) => {
  return (
    <li className="ctypes-list-item">
      <div className="index">{index + 1}</div>
      <div className="index">{data.metadata.title}</div>
      <div className="owner">{data.ctypeHash}</div>
      <div
        className="op-btn"
        onClick={() => {
          handleDetail(data);
        }}
      >
        <img src={detailImg} alt="" />
      </div>
    </li>
  );
};
export default ListItem;
