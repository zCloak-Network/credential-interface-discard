/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-14 21:00:08
 * @LastEditTime: 2022-04-16 20:14:47
 */
import React from "react";
import classNames from "classnames";
import { shortenAddress } from "../../utils";

import loading from "../../images/loading_1.gif";

type Props = {
  data: any;
};

const Uploading: React.FC<Props> = ({ data }) => {
  const jumpTxDetail = (data) => {
    window.open(`https://moonbase.moonscan.io/tx/${data.transactionHash}`);
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
