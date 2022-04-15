/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-14 21:00:08
 * @LastEditTime: 2022-04-15 11:13:31
 */
import React from "react";
import classNames from "classnames";
import { shortenAddress } from "../../utils";

import loading from "../../images/loading_1.gif";

const Uploading: React.FC = () => {
  const data = [
    {
      verified: true,
      verifiedAddress: "0x5BF631060b226407A1353bcEef88e3f98aB722A8",
    },
    {
      verified: false,
      verifiedAddress: "0x5BF631060b226407A1353bcEef88e3f98aB722A8",
    },
    {
      verified: "loading",
      verifiedAddress: "0x5BF631060b226407A1353bcEef88e3f98aB722A8",
    },
  ];

  return (
    <div className="uploading-timeline">
      {data.map((it) => (
        <div
          key={it.verifiedAddress}
          className={classNames("uploading-timeline-item", {
            "uploading-true": it.verified,
            "uploading-false": !it.verified,
          })}
        >
          <i
            className={classNames("iconfont", {
              icon_success2: it.verified,
              icon_empty: !it.verified,
            })}
          ></i>

          <span className="uploading-result">
            {it.verified ? "Verified True" : "Verified Flase"}
          </span>
          <span className="uploading-address">
            By worker&nbsp;<span>{shortenAddress(it.verifiedAddress)}</span>
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
