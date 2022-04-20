/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-14 21:00:08
 * @LastEditTime: 2022-04-20 11:15:00
 */
import React from "react";
import classNames from "classnames";
import { shortenAddress } from "../../utils";
import { MOONSCANTX } from "../../constants/guide";

import loading from "../../images/loading_1.gif";

type Props = {
  data: any;
};

const Uploading: React.FC<Props> = ({ data }) => {
  const jumpTxDetail = (data) => {
    window.open(`${MOONSCANTX}${data.transactionHash}`);
  };

  return (
    <div className="uploading-timeline">
      {data?.verifying.map((it) => (
        <div
          key={it.worker}
          className={classNames("uploading-timeline-item", {
            "uploading-true": it.isPassed,
            "uploading-false": !it.isPassed,
          })}
        >
          <i
            className={classNames("iconfont", {
              icon_success2: it.isPassed,
              icon_empty: !it.isPassed,
            })}
          ></i>

          <span
            className="uploading-result"
            onClick={() => {
              jumpTxDetail(it);
            }}
          >
            {it.isPassed ? "Verified True" : "Verified Flase"}
          </span>
          <span className="uploading-address">
            By worker&nbsp;<span>{shortenAddress(it.worker)}</span>
          </span>
        </div>
      ))}
      <div className="uploading-timeline-item uploading">
        <div className="loading-icon">
          <img src={loading} alt="" />
        </div>
        <span className="uploading-message">Loading…</span>
      </div>
    </div>
  );
};
export default Uploading;
