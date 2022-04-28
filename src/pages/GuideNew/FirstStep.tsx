/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-28 15:39:02
 */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Button from "../../components/Button";
import { MESSAGECODE, zkIDEXTENSION, GUIDEDESC } from "../../constants/guide";
import { openMessage, destroyMessage } from "../../utils/message";

import bg from "../../images/step_install.svg";

type Props = {
  handleNext: () => void;
};

const messageKey = "installExtension";

const FirstStep: React.FC<Props> = ({ handleNext }) => {
  const [status, setStatus] = useState<string>("next");
  const [hasPassword, setPassword] = useState<boolean>(false);

  const handleInstall = () => {
    window.open(zkIDEXTENSION);
  };

  const openExtension = async () => {
    const { openzkIDPopup } = window?.zCloak?.zkID;
    openzkIDPopup("OPEN_FIRST");
    setStatus("extensionNext");
    const data = STATUS.extensionNext;
    openMessage(data.message, data.messageType, messageKey);
  };

  const STATUS = {
    install: {
      buttonText: "Install",
      buttonType: null,
      func: handleInstall,
      message: null,
      messageType: null,
    },
    create: {
      buttonText: "Create Password",
      buttonType: null,
      func: openExtension,
      message: null,
      messageType: null,
    },
    extensionNext: {
      buttonText: "loading",
      buttonType: "loading",
      func: null,
      message:
        "Please click the NEXT button in the extension to create password",
      messageType: "warning",
    },
    extensionCreate: {
      buttonText: "loading",
      buttonType: "loading",
      func: null,
      message: "Create a new password in the pluginin the extension",
      messageType: "warning",
    },
    next: {
      buttonText: "Next",
      buttonType: null,
      func: handleNext,
      message: null,
      messageType: null,
    },
  };

  useEffect(() => {
    if (!window?.zCloak?.zkID) {
      setStatus("install");
      return;
    }

    setStatus("next");
  }, []);

  const detail = STATUS[status];

  const init = async () => {
    const { getIfCreatePassword } = window?.zCloak?.zkID;

    const hasPassword = await getIfCreatePassword();

    if (hasPassword) {
      setStatus("next");
      setPassword(true);
    } else {
      setStatus("create");
    }
  };

  useEffect(() => {
    if (window?.zCloak?.zkID) {
      init();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { statusCode, data } = event.data;

      if (statusCode === MESSAGECODE.EXTENSION_CLOSED) {
        if (!hasPassword) {
          setStatus("create");
        } else {
          setStatus("next");
        }

        destroyMessage(messageKey);
      }

      if (statusCode === MESSAGECODE.SEND_BACKNEXT_TO_WEB && data.clickBack) {
        setStatus("extensionNext");
        const data = STATUS.extensionNext;
        openMessage(data.message, data.messageType, messageKey);
      }

      if (statusCode === MESSAGECODE.SEND_NEXT_TO_WEB && data.clickNext) {
        setStatus("extensionCreate");
        const data = STATUS.extensionCreate;
        openMessage(data.message, data.messageType, messageKey);
      }

      if (
        statusCode === MESSAGECODE.SEND_CREATE_PASSWORD_SUCCESS_TO_WEB &&
        data.createPassword
      ) {
        setStatus("next");
        setPassword(true);
        destroyMessage(messageKey);
      }
    });
  }, [hasPassword]);

  return (
    <div className="step-wrapper">
      <div className="title">{GUIDEDESC.installExtension.title}</div>
      <div className="sub-title">{GUIDEDESC.installExtension.desc}</div>
      <img src={bg} alt="" className="install-bg" />
      <Button
        className={classNames("btn", {
          "create-btn": status === "create",
        })}
        size="default"
        onClick={detail.func}
        loading={detail.buttonType}
      >
        {detail.buttonText}
      </Button>
    </div>
  );
};
export default FirstStep;
