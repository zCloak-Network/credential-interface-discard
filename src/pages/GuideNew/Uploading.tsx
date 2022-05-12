/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-14 21:00:08
 * @LastEditTime: 2022-05-10 16:51:14
 */
import React from "react";
import classNames from "classnames";
import { shortenAddress } from "../../utils";
import { MOONSCAN_TX_URL } from "../../constants/guide";
import Button from "../../components/Button";
import { IProof } from "./index";
import loading from "../../images/loading_1.gif";

interface IProps {
  data: IProof;
  uploaded: boolean;
  handleNext: () => void;
}

const Uploading: React.FC<IProps> = ({ data, uploaded, handleNext }) => {
  const jumpTxDetail = (data) => {
    window.open(`${MOONSCAN_TX_URL}${data.transactionHash}`);
  };

  return (
    <div className="uploading-timeline">
      <div className="uploading-timeline-wrapper">
        {data?.verifying.map((it, index) => (
          <div
            key={it.worker}
            className={classNames("uploading-timeline-item", {
              "uploading-true": it.isPassed,
              "uploading-false": !it.isPassed,
              "last-uploading":
                index === data?.verifying.length - 1 && uploaded,
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
              <i className="iconfont a-ziyuan11 jump-btn" />
            </span>
            <span className="uploading-address">
              By worker&nbsp;<span>{shortenAddress(it.worker)}</span>
            </span>
          </div>
        ))}
      </div>

      {uploaded ? (
        <Button
          className="btn"
          style={{ margin: "44px auto auto" }}
          onClick={handleNext}
        >
          Next
        </Button>
      ) : (
        <div className="uploading-timeline-item uploading">
          <div className="loading-icon">
            <img src={loading} alt="" />
          </div>
          <span className="uploading-message">Loading…</span>
        </div>
      )}
    </div>
  );
};
export default Uploading;
