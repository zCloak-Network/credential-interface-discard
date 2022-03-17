/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-30 16:51:36
 * @LastEditTime: 2022-02-25 16:04:52
 */
import React from "react";
import { useToggleDetailModal } from "../../state/application/hooks";

import detailImg from "../../images/icon_detials.svg";

import "./ListItem.scss";

interface Props {
  index: number;
  data: {
    claimer: string;
    ctype: string;
    status: string;
    time: string;
  };
}

export default function ListItem({ data, index }: Props): JSX.Element {
  const toggleModal = useToggleDetailModal();

  return (
    <div className="attestion-list-item">
      <span>{index}</span>
      <span>{data.claimer || "-"}</span>
      <span>{data.ctype || "-"}</span>
      <span>{data.status || "-"}</span>
      <span>{data.time || "-"}</span>
      <span>
        <span
          className="op-btn"
          onClick={() => {
            toggleModal();
          }}
        >
          <img src={detailImg} alt="" />
        </span>
      </span>
    </div>
  );
}
