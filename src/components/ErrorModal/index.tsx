/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2022-03-30 11:21:33
 */
import React from "react";
import Modal from "../Modal";
import Button from "../Button";
import {
  useModalOpen,
  useToggleErrorModal,
} from "../../state/application/hooks";
import { PersistentStore } from "../../state/PersistentStore";
import { ApplicationModal } from "../../state/application/reducer";

import "./index.scss";

type Props = {
  resetPassword: () => void;
};

export default function ErrorModal({ resetPassword }: Props): JSX.Element {
  const toggleErrorModal = useToggleErrorModal();
  const errorModalOpen = useModalOpen(ApplicationModal.ERROR);

  const clear = (): void => {
    PersistentStore.clearLocalStorage();
    toggleErrorModal();
    resetPassword();
  };

  return (
    <Modal
      width="488px"
      visible={errorModalOpen}
      title="Be careful!"
      onCancel={toggleErrorModal}
      wrapClassName="login-err-modal"
    >
      <p className="err-tip">
        <span>Forget password</span>
        will clear your local storage, this means you may lose some important
        data, including your credentials, keystores and private keys.
      </p>
      <div className="centerDiv">
        <Button onClick={clear} className="clear-btn">
          Forget and clear storage
        </Button>
      </div>
    </Modal>
  );
}
