/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-04-01 18:14:42
 */
import React, { useState } from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleRequestModal,
} from "../../state/application/hooks";
import { useGetCurrIdentity } from "../../state/wallet/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import Button from "../../components/Button";
import ClaimDetail from "../../components/ClaimDetail";
import { sendMessage } from "../../services/api";
import * as Kilt from "@kiltprotocol/sdk-js";
import type { MessageBody } from "@kiltprotocol/sdk-js";
import { useAddPopup } from "../../state/application/hooks";
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

const RequestAttestationModal: React.FC<Props> = ({ detail }) => {
  const [loading, setLoading] = useState(false);
  const addPopup = useAddPopup();
  const currAccount = useGetCurrIdentity();
  const toggleModal = useToggleRequestModal();
  const modalOpen = useModalOpen(ApplicationModal.REQUEST_ATTESTATION);

  const handleSendMessage = async () => {
    await setLoading(true);
    try {
      const keystoreClaimer = new Kilt.Did.DemoKeystore();
      const keystoreAttester = new Kilt.Did.DemoKeystore();

      const receiverFullDid = await getFullDid(
        Kilt.Did.DidUtils.getIdentifierFromKiltDid(detail.meta?.ctype?.owner)
      );

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
      await sendMessage({ ...encryptedPresentationMessage });
      await toggleModal();
      await setLoading(false);
    } catch (error) {
      addPopup({
        txn: {
          hash: "",
          success: false,
          title: error.name,
          summary: error.message,
        },
      });
      await setLoading(false);
      throw error;
    }
  };

  return (
    <Modal
      width="700px"
      visible={modalOpen}
      title="Request attestation"
      onCancel={() => {
        toggleModal();
      }}
      wrapClassName="request-modal"
    >
      <div className="detail-wrapper">
        <ClaimDetail data={detail} />
      </div>
      <Button
        type="primary"
        loading={loading}
        className="request-btn"
        onClick={handleSendMessage}
      >
        Request Attestation
      </Button>
    </Modal>
  );
};
export default RequestAttestationModal;
