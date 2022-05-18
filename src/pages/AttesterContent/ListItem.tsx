/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-30 16:51:36
 * @LastEditTime: 2022-05-16 11:11:37
 */
import React from "react";
import dayjs from "dayjs";
import { shortenHash } from "../../utils";
import { timeFormat } from "../../constants";
import { IMessage } from "@kiltprotocol/types";

import detailImg from "../../images/icon_detials.svg";

import "./ListItem.scss";

interface Props {
  index: number;
  handleClick: (data: IMessage) => void;
  data: any;
}

export default function ListItem({
  data,
  index,
  handleClick,
}: Props): JSX.Element {
  return (
    <div className="attestion-list-item">
      <span>{index}</span>
      <span>{shortenHash(data.sender)}</span>
      <span>
        {shortenHash(data.body.content.requestForAttestation.claim.cTypeHash) ||
          "-"}
      </span>
      <span>{data.status || "-"}</span>
      <span>
        {data?.createdAt
          ? dayjs(data?.createdAt).format(timeFormat.dateTime)
          : "-"}
      </span>
      <span>
        <span
          className="op-btn"
          onClick={() => {
            handleClick(data);
          }}
        >
          <img src={detailImg} alt="" />
        </span>
      </span>
    </div>
  );
}
