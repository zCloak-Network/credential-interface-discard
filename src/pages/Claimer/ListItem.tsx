/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-30 16:51:36
 * @LastEditTime: 2022-03-16 21:18:58
 */
import React from "react";
import * as Kilt from "@kiltprotocol/sdk-js";
import dayjs from "dayjs";
import { shortenHash } from "../../utils";
import { timeFormat } from "../../constants";
import {
  useToggleRequestModal,
  useToggleDetailModal,
} from "../../state/application/hooks";
import FileSaver from "file-saver";
import detailImg from "../../images/icon_detials.svg";
import forwardImg from "../../images/icon_forward.svg";
import downloadImg from "../../images/icon_download.svg";

import "./ListItem.scss";

interface Props {
  index: number;
  setSelectItem: (value) => void;
  data: {
    requestForAttestations: {
      rootHash: string;
    };
    meta: {
      alias: string;
      time: string;
    };
    claim: {
      cTypeHash: string;
      contents: any;
      owner: string;
    };
  };
}

export default function ListItem({
  data,
  index,
  setSelectItem,
}: Props): JSX.Element {
  const toggleModal = useToggleRequestModal();
  const toggleDetailModal = useToggleDetailModal();

  const download = () => {
    const requestForAttestation = Kilt.RequestForAttestation.fromClaim(
      data.claim
    );

    const blob = new Blob([JSON.stringify(requestForAttestation)], {
      type: "text/plain;charset=utf-8",
    });

    FileSaver.saveAs(blob, "credential.txt");
  };

  return (
    <div className="claim-list-item">
      <span>{index}</span>
      <span>{data.meta?.alias || "-"}</span>
      <span>{shortenHash(data.requestForAttestations?.rootHash) || "-"}</span>
      <span>{shortenHash(data.claim?.cTypeHash) || "-"}</span>
      <span>false</span>
      <span>
        {data.meta?.time
          ? dayjs(data.meta?.time).format(timeFormat.dateTime)
          : "-"}
      </span>
      <span>
        <span className="op-btn" onClick={download}>
          <img src={downloadImg} alt="" />
        </span>
        <span
          className="op-btn"
          onClick={() => {
            setSelectItem(data);
            toggleModal();
          }}
        >
          <img src={forwardImg} alt="" />
        </span>
        <span
          className="op-btn"
          onClick={() => {
            setSelectItem(data);
            toggleDetailModal();
          }}
        >
          <img src={detailImg} alt="" />
        </span>
      </span>
    </div>
  );
}
