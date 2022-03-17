/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-03-17 22:11:20
 */
import React, { useState } from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleRequestModal,
} from "../../state/application/hooks";
import { useGetCurrIdentity, useGetidentities } from "../../state/wallet/hooks";
import { Select } from "antd";
import { ApplicationModal } from "../../state/application/reducer";
import { shortenHash } from "../../utils";
import Button from "../../components/Button";
import ClaimDetail from "../../components/ClaimDetail";
import { sendMessage } from "../../services/api";
import * as Kilt from "@kiltprotocol/sdk-js";
import type { MessageBody } from "@kiltprotocol/sdk-js";

import "./index.scss";

type Props = {
  detail: any;
};

const { Option } = Select;

const RequestAttestationModal: React.FC<Props> = ({ detail }) => {
  const identities = useGetidentities();
  const currAccount = useGetCurrIdentity();
  const toggleModal = useToggleRequestModal();
  const [receiver, setReceiver] = useState("");
  const modalOpen = useModalOpen(ApplicationModal.REQUEST_ATTESTATION);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setReceiver(value);
  };

  const handleSendMessage = async () => {
    const receiverData = identities.find(
      (it) => it.account.address === receiver
    );

    const requestForAttestation = Kilt.RequestForAttestation.fromClaim(
      detail.claim
    );
    const messageBody: MessageBody = {
      content: { requestForAttestation },
      type: Kilt.Message.BodyType.REQUEST_ATTESTATION,
    };
    const message = new Kilt.Message(
      messageBody,
      currAccount.lightDid.didUri,
      receiverData.fullDid.did
    );

    // const attesterEncryptionKey = receiverData.account.getKeys(
    //   KeyRelationship.keyAgreement
    // )[0] as IDidKeyDetails<string>;

    // const claimerEncryptionKey = currAccount.account.getKeys(
    //   KeyRelationship.keyAgreement
    // )[0] as IDidKeyDetails<string>;

    console.log(777711, message);
    await sendMessage({ ...message });
    toggleModal();
    /* The message can be encrypted as follows: */
    // const encryptedMessage = await message.encrypt(
    //   currAccount.lightDid.didUri,
    //   receiverData.fullDid.did,
    //   keystore
    // );
  };

  return (
    <Modal
      width="700px"
      visible={modalOpen}
      title="Request attestation"
      onCancel={() => {
        toggleModal();
        setReceiver("");
      }}
      wrapClassName="request-modal"
    >
      <Select
        style={{ width: "100%", marginBottom: 10 }}
        onChange={handleChange}
        dropdownClassName="request-select"
      >
        {identities.map((it) => {
          if (it.fullDid && it.fullDid.did) {
            return (
              <Option value={it.account.address} key={it.account.address}>
                {shortenHash(it.account.address)}
              </Option>
            );
          }
        })}
      </Select>
      <div className="detail-wrapper">
        <ClaimDetail data={detail} />
      </div>
      <Button
        type="primary"
        disabled={!receiver}
        className="request-btn"
        onClick={handleSendMessage}
      >
        Request Attestation
      </Button>
    </Modal>
  );
};
export default RequestAttestationModal;
