/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-03-31 16:14:23
 */
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleRequestModal,
} from "../../state/application/hooks";
import {
  useGetCurrIdentity,
  useGetClaimers,
  useGetAttesters,
} from "../../state/wallet/hooks";
import { Select } from "antd";
import { ApplicationModal } from "../../state/application/reducer";
import { shortenHash } from "../../utils";
import Button from "../../components/Button";
import ClaimDetail from "../../components/ClaimDetail";
import { sendMessage, getAttester } from "../../services/api";
import * as Kilt from "@kiltprotocol/sdk-js";
import type { MessageBody } from "@kiltprotocol/sdk-js";
import {
  getFullDid,
  generateLightDid,
  generateFullKeypairs,
  generateLightKeypairs,
} from "../../utils/accountUtils";

import "./index.scss";

type Props = {
  detail: any;
};

const { Option } = Select;

const RequestAttestationModal: React.FC<Props> = ({ detail }) => {
  const currAccount = useGetCurrIdentity();
  const [loading, setLoading] = useState(false);
  const toggleModal = useToggleRequestModal();
  const [receiver, setReceiver] = useState("");
  const [attesters, setAttesters] = useState([]);
  const modalOpen = useModalOpen(ApplicationModal.REQUEST_ATTESTATION);

  const handleChange = (value) => {
    setReceiver(value);
  };

  const handleSendMessage = async () => {
    await setLoading(true);
    const keystoreClaimer = new Kilt.Did.DemoKeystore();
    const keystoreAttester = new Kilt.Did.DemoKeystore();
    const receiverFullDid = await getFullDid(receiver);

    const requestForAttestation = Kilt.RequestForAttestation.fromClaim(
      detail.claim
    );

    const lightKeypairs = await generateLightKeypairs(
      keystoreClaimer,
      currAccount.mnemonic
    );
    const lightDid = await generateLightDid(lightKeypairs);

    const messageBody: MessageBody = {
      content: { requestForAttestation },
      type: Kilt.Message.BodyType.REQUEST_ATTESTATION,
    };

    const message = new Kilt.Message(
      messageBody,
      currAccount?.lightDidDetails?.did,
      receiverFullDid.did
    );

    await generateFullKeypairs(keystoreAttester, currAccount.mnemonic);

    const encryptedPresentationMessage = await message.encrypt(
      lightDid.encryptionKey!.id,
      lightDid,
      keystoreAttester,
      receiverFullDid.assembleKeyId(receiverFullDid.encryptionKey!.id)
    );

    await setLoading(false);
    await sendMessage({ ...encryptedPresentationMessage });
    await toggleModal();
  };

  const queryAttester = async () => {
    const res = await getAttester();
    if (res?.data.code === 200) {
      setAttesters(res.data.data);
    }
  };

  useEffect(() => {
    queryAttester();
  }, []);

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
        {attesters.map((it) => {
          return (
            <Option value={it.address} key={it.address}>
              {shortenHash(it.address)}
            </Option>
          );
        })}
      </Select>
      <div className="detail-wrapper">
        <ClaimDetail data={detail} />
      </div>
      <Button
        type="primary"
        loading={loading}
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
