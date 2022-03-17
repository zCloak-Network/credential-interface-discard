/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-03-17 15:29:55
 */
import React from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleRequestModal,
} from "../../state/application/hooks";
import { useGetidentities } from "../../state/wallet/hooks";
import { Select } from "antd";
import { ApplicationModal } from "../../state/application/reducer";
import { shortenHash } from "../../utils";
import Button from "../../components/Button";
import ClaimDetail from "../../components/ClaimDetail";
import { sendMessage } from "../../services/api";
import * as Kilt from "@kiltprotocol/sdk-js";

import "./index.scss";

type Props = {
  detail: any;
};

const { Option } = Select;

const RequestAttestationModal: React.FC<Props> = ({ detail }) => {
  const identities = useGetidentities();
  const toggleModal = useToggleRequestModal();
  const errorModalOpen = useModalOpen(ApplicationModal.REQUEST_ATTESTATION);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSendMessage = () => {
    // const claim = Kilt.Claim.fromCTypeAndClaimContents(
    //   ctype,
    //   detail.claim.contents,
    //   claimerLightDid.did
    // );
    // const messageBody: MessageBody = {
    //   content: { requestForAttestation },
    //   type: Kilt.Message.BodyType.REQUEST_ATTESTATION,
    // };
    // const message = new Kilt.Message(
    //   messageBody,
    //   claimerLightDid.did,
    //   attesterFullDid.did
    // );
  };

  return (
    <Modal
      width="700px"
      visible={errorModalOpen}
      title="Request attestation"
      onCancel={toggleModal}
      wrapClassName="request-modal"
    >
      <Select
        style={{ width: "100%", marginBottom: 10 }}
        onChange={handleChange}
        dropdownClassName="request-select"
      >
        {identities.map((it) => (
          <Option value={it.account.address} key={it.account.address}>
            {shortenHash(it.account.address)}
          </Option>
        ))}
      </Select>
      <div className="detail-wrapper">
        <ClaimDetail data={detail} />
      </div>
      <Button
        type="primary"
        className="request-btn"
        onClick={handleSendMessage}
      >
        Request Attestation
      </Button>
    </Modal>
  );
};
export default RequestAttestationModal;
