/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2022-05-24 14:18:43
 */
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import {
  useModalOpen,
  useToggleGuideReplay,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { GUIDE_ACCOUNT } from "../../constants/guide";

import "./index.scss";

export default function ErrorModal(): JSX.Element {
  const toggleGuideReplayModal = useToggleGuideReplay();
  const errorModalOpen = useModalOpen(ApplicationModal.GUIDE_REPLAY);

  const clear = (): void => {
    localStorage.removeItem(GUIDE_ACCOUNT);
    toggleGuideReplayModal();
    window.location.reload();
  };

  return (
    <Modal
      width="488px"
      visible={errorModalOpen}
      title="Be careful!"
      onCancel={toggleGuideReplayModal}
      wrapClassName="login-err-modal"
    >
      <p className="err-tip">
        <span>Replay</span> &nbsp; will clear your local storage, this means you
        may lose some important data, including your credentials and proofs.
      </p>
      <div className="centerDiv">
        <Button onClick={clear} className="clear-btn">
          Clear storage and repaly
        </Button>
      </div>
    </Modal>
  );
}
