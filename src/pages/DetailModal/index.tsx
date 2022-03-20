/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-24 15:55:51
 * @LastEditTime: 2022-03-18 14:28:46
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
  footer?: boolean;
  handleSubmit?: () => void;
  data: {
    claim: {
      cTypeHash: string;
      contents: any;
      owner: string;
    };
  };
}

const DetailModal: React.FC<Props> = ({
  footer = true,
  data,
  handleSubmit,
}) => {
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
      {footer && (
        <div>
          <Button
            type="primary"
            style={{ height: "60px", marginTop: "10px", width: "100%" }}
            onClick={handleSubmit}
          >
            Attest Claim
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default DetailModal;
