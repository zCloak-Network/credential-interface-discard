/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-16 21:31:30
 * @LastEditTime: 2022-04-01 18:12:00
 */
import React from "react";
import Code from "../../components/Code";
import { shortenHash } from "../../utils";

import "./index.scss";

type Props = {
  data: any;
};

const ClaimDetail: React.FC<Props> = ({ data }) => {
  return (
    <div className="claimDetail">
      <div className="modal-wrapper">
        <div className="detail-item">
          <span className="detail-item-label">Ctype</span>
          <span className="detail-item-value">
            {shortenHash(data?.claim.cTypeHash)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-item-label">Attester</span>
          <span className="detail-item-value">
            {shortenHash(data?.meta?.ctype?.owner, 18)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-item-label">Owner</span>
          <span className="detail-item-value">
            {shortenHash(data?.claim.owner, 18)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-item-label">Contents</span>
          <span className="detail-item-value detail-item-code">
            <Code>{data?.claim.contents}</Code>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ClaimDetail;
