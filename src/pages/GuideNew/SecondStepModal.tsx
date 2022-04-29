/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-11 23:15:44
 * @LastEditTime: 2022-04-29 17:39:09
 */
import React, { useMemo, useState } from "react";
import Modal from "../../components//Modal";
import Button from "../../components/Button";
import {
  useModalOpen,
  useToggleGuideMessage,
} from "../../state/application/hooks";
import { useInterval } from "ahooks";
import { ApplicationModal } from "../../state/application/reducer";

import "./SecondStepModal.scss";

const SecondStepModal: React.FC = () => {
  const [countdown, setCountdown] = useState(5000);
  const [interval, setInterval] = useState(1000);
  const toggleModal = useToggleGuideMessage();
  const modalOpen = useModalOpen(ApplicationModal.GUIDE_MESSAGE);

  const update = () => {
    if (!!countdown) {
      setCountdown(countdown - 1000);
    } else {
      setInterval(undefined);
    }
  };

  useInterval(() => {
    update();
  }, interval);
  const disabled = useMemo(() => countdown !== 0, [countdown]);

  return (
    <Modal
      width="700px"
      visible={modalOpen}
      title={null}
      onCancel={toggleModal}
      maskClosable={false}
      wrapClassName="guide-message-modal"
    >
      <div className="email">
        <p className="email-title">Dear Adventurer, </p>
        <p>
          Welcome to the zCloak Kingdom! Here you can team up with people to
          explore a dungeon. Of course, it would be easier if you know each
          other in advance—such as your experience, damage type or equipment
          level.
        </p>
        <p>
          In zCloak Kingdom, we treat your privacy as the first priority. Thus
          we have introduced a POAP system to represent you without giving away
          your detailed information. Here is how it works.
        </p>
        <p>
          First, you need to fill in some basic information. Our secrecy agency
          will check it, attest to it and issue an identity credential to you.
        </p>
        <p>
          Second, use the zCloak ID Wallet to generate a STARK proof based on
          your credential. Our scholars will verify the validity of your proof.
          If the proof is correct, a POAP will be offered to you.
        </p>
        <p>Use it with your teammates and have an awesome journey!</p>
        <p className="email-footer">zCloak Kingdom</p>
      </div>
      <div className="btn-wrapper">
        {disabled ? (
          <Button className="btn" disabled={true}>
            Please read {countdown / 1000}s
          </Button>
        ) : (
          <Button onClick={toggleModal} className="btn">
            Understand
          </Button>
        )}
      </div>
    </Modal>
  );
};
export default SecondStepModal;
