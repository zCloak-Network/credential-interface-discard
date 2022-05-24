/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-18 15:35:51
 */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Button from "../../components/Button";
import {
  MESSAGE_CODE,
  zkID_EXTENSION,
  GUIDE_DESC,
} from "../../constants/guide";
import { openMessage, destroyMessage } from "../../utils/message";

import bg from "../../images/step_install.webp";

export interface IButtonStaus {
  buttonText: string;
  buttonType: string | null;
  func: any;
  message: string | null;
  messageType: "warning" | "error" | null;
}

interface IProps {
  jumpStep: (step: number) => void;
}

const messageKey = "installExtension";

const FirstStep: React.FC<IProps> = ({ jumpStep }) => {
  const [status, setStatus] = useState<string>("next");
  const [hasPassword, setPassword] = useState<boolean>(false);

  const handleInstall = () => {
    window.open(zkID_EXTENSION);
  };

  const openExtension = async () => {
    const { openzkIDPopup } = window?.zCloak?.zkID;
    openzkIDPopup("OPEN_FIRST");
    setStatus("extensionNext");
    const data = BUTTON_MESSAGE_STATUS.extensionNext;
    openMessage(data.message, data.messageType, messageKey);
  };

  const BUTTON_MESSAGE_STATUS: {
    [statusName: string]: IButtonStaus;
  } = {
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
      func: () => {
        jumpStep(1);
      },
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

  const detail = BUTTON_MESSAGE_STATUS[status];

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

  const handleEvent = (event: { data: { statusCode: string; data: any } }) => {
    const { statusCode, data } = event.data;

    if (statusCode === MESSAGE_CODE.EXTENSION_CLOSED) {
      if (!hasPassword) {
        setStatus("create");
      } else {
        setStatus("next");
      }

      destroyMessage(messageKey);
    }

    if (statusCode === MESSAGE_CODE.SEND_BACKNEXT_TO_WEB && data.clickBack) {
      setStatus("extensionNext");
      const data = BUTTON_MESSAGE_STATUS.extensionNext;
      openMessage(data.message, data.messageType, messageKey);
    }

    if (statusCode === MESSAGE_CODE.SEND_NEXT_TO_WEB && data.clickNext) {
      setStatus("extensionCreate");
      const data = BUTTON_MESSAGE_STATUS.extensionCreate;
      openMessage(data.message, data.messageType, messageKey);
    }

    if (
      statusCode === MESSAGE_CODE.SEND_CREATE_PASSWORD_SUCCESS_TO_WEB &&
      data.createPassword
    ) {
      setStatus("next");
      setPassword(true);
      destroyMessage(messageKey);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
      destroyMessage(messageKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPassword]);

  return (
    <div className="step-wrapper">
      <div className="title">{GUIDE_DESC.installExtension.title}</div>
      <div className="sub-title">{GUIDE_DESC.installExtension.desc}</div>
      <img src={bg} alt="" className="install-bg" />
      <Button
        className={classNames("btn", {
          "create-btn": status === "create",
        })}
        size="default"
        onClick={detail.func}
        loading={!!detail.buttonType}
      >
        {detail.buttonText}
      </Button>
    </div>
  );
};
export default FirstStep;
