/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-30 16:51:36
 * @LastEditTime: 2022-03-31 16:09:40
 */
import React from "react";
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
import loading from "../../images/loading_1.gif";

import "./ListItem.scss";

interface Props {
  index: number;
  attestation: any;
  attestationLoading: boolean;
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
  attestation,
  setSelectItem,
  attestationLoading,
}: Props): JSX.Element {
  const toggleModal = useToggleRequestModal();
  const toggleDetailModal = useToggleDetailModal();

  const isTested = !!attestation;

  const download = async () => {
    const blob = await new Blob(
      [JSON.stringify(attestation?.body?.content?.attestation)],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    await FileSaver.saveAs(blob, "credential.json");
  };

  return (
    <div className="claim-list-item">
      <span>{index}</span>
      <span>{data.meta?.alias || "-"}</span>
      <span>
        {isTested
          ? shortenHash(attestation?.body?.content?.attestation?.claimHash)
          : "-"}
      </span>
      <span>{shortenHash(data.claim?.cTypeHash) || "-"}</span>
      <span>
        {attestationLoading && <img src={loading} className="loading" />}
        {isTested && !attestationLoading && (
          <i className="iconfont icon_success2" />
        )}
        {!isTested && !attestationLoading && (
          <i className="iconfont icon_empty" />
        )}
      </span>
      <span>
        {data.meta?.time
          ? dayjs(data.meta?.time).format(timeFormat.dateTime)
          : "-"}
      </span>
      <span>
        {isTested ? (
          <span className="op-btn" onClick={download}>
            <img src={downloadImg} alt="" />
          </span>
        ) : (
          <span
            className="op-btn"
            onClick={() => {
              setSelectItem(data);
              toggleModal();
            }}
          >
            <img src={forwardImg} alt="" />
          </span>
        )}
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
