/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-03-16 21:40:22
 */
import React from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleDetailModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import ClaimDetail from "../../components/ClaimDetail";

interface Props {
  data: {
    claim: {
      cTypeHash: string;
      contents: any;
      owner: string;
    };
  };
}

const DetailModal: React.FC<Props> = ({ data }) => {
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
    </Modal>
  );
};

export default DetailModal;
