/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-01 11:29:37
 * @LastEditTime: 2022-04-01 11:51:29
 */
import React from "react";
import Modal from "../Modal";
import Code from "../../components/Code";
import { shortenHash } from "../../utils";

import "./index.scss";

type Props = {
  data: any;
  visible: boolean;
  onCancel: () => void;
};

const CtypeDetailModal: React.FC<Props> = ({ data, visible, onCancel }) => {
  return (
    <Modal
      width="700px"
      visible={visible}
      title="Ctype details"
      onCancel={onCancel}
      wrapClassName="ctype-detail-modal"
    >
      <div className="modal-wrapper">
        <div className="detail-item">
          <span className="detail-item-label">title</span>
          <span className="detail-item-value">{data?.metadata?.title}</span>
        </div>
        <div className="detail-item">
          <span className="detail-item-label">ctypeHash</span>
          <span className="detail-item-value">
            {shortenHash(data?.ctypeHash)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-item-label">properties</span>
          <span className="detail-item-value detail-item-code">
            <Code>{data?.metadata?.properties}</Code>
          </span>
        </div>
      </div>
    </Modal>
  );
};
export default CtypeDetailModal;
