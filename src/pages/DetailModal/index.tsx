/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-03-23 23:14:22
 */
import React from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleDetailModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import ClaimDetail from "../../components/ClaimDetail";
import Button from "../../components/Button";

interface Props {
  // TODO
  footer?: boolean | React.ReactNode;
  data: {
    claim: {
      cTypeHash: string;
      contents: any;
      owner: string;
    };
  };
}

const DetailModal: React.FC<Props> = ({ footer = true, data }) => {
  const toggleModal = useToggleDetailModal();
  const modalOpen = useModalOpen(ApplicationModal.ATTESTATION_DETAIL);

  return (
    <Modal
      width="700px"
      visible={modalOpen}
      title="Claim details"
      onCancel={toggleModal}
      wrapClassName="claim-details-modal"
    >
      <ClaimDetail data={data} />
      {footer && footer}
    </Modal>
  );
};

export default DetailModal;
