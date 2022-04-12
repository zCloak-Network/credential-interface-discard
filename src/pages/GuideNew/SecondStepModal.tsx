/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-11 23:15:44
 * @LastEditTime: 2022-04-12 10:59:09
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
          In the zCloak Kingdom, you must have a zkPortrait to identify
          yourself.
        </p>
        <p>
          zCloak Kingdom will offer three pieces of random rarity equipment for
          each new adventurer.
        </p>
        <p>
          Depending on your profession and age, you should have different
          portraits and the average of all equipment rarities will determine
          your equipment level.
        </p>
        <p>
          In this example, we demonstrate a way to guide you to create your
          zkPortrait without revealing your specific profession, age, or
          equipment rarity.
        </p>
        <p className="email-footer">zCloak Kingdom</p>
      </div>
      <div className="btn-wrapper">
        {disabled ? (
          <Button className="btn" disabled={true}>
            Please read {countdown / 1000}s
          </Button>
        ) : (
          <Button onClick={toggleModal} className="btn">
            Understand , next
          </Button>
        )}
      </div>
    </Modal>
  );
};
export default SecondStepModal;
