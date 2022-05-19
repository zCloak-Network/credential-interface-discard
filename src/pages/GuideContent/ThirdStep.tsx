/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-18 15:51:55
 */
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { CTYPE_HASH, MESSAGE_CODE, GUIDE_DESC } from "../../constants/guide";
import { openMessage, destroyMessage } from "../../utils/message";
import classNames from "classnames";
import { IButtonStaus } from "./FirstStep";

import bg from "../../images/step_import.webp";

interface IProps {
  handleNext: () => void;
}

const messageKey = "importCredential";

const ThirdStep: React.FC<IProps> = ({ handleNext }) => {
  const [status, setStatus] = useState<string>("next");
  const [hasCredential, setHasCredential] = useState<boolean>(false);

  const openExtension = async () => {
    const { openzkIDPopup } = window?.zCloak?.zkID;
    openzkIDPopup(MESSAGE_CODE.OPEN_IMPORT_CREDENTIAL);
    setStatus("extensionImport");
    const data = BUTTON_MESSAGE_STATUS.extensionImport;
    openMessage(data.message, data.messageType, messageKey);
  };

  const BUTTON_MESSAGE_STATUS: {
    [statusName: string]: IButtonStaus;
  } = {
    import: {
      buttonText: "Import Credential",
      buttonType: null,
      func: openExtension,
      message: null,
      messageType: null,
    },
    extensionImport: {
      buttonText: "loading",
      buttonType: "loading",
      func: null,
      message: "Please select the Credential file and Import it",
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

  const handleEvent = (event: { data: { statusCode: string; data: any } }) => {
    const { statusCode, data } = event.data;

    if (statusCode === MESSAGE_CODE.EXTENSION_CLOSED) {
      if (!hasCredential) {
        setStatus("import");
      } else {
        setStatus("next");
      }

      destroyMessage(messageKey);
    }

    if (
      statusCode === MESSAGE_CODE.SEND_IMPORT_CREDENTIAL_SUCCESS_TO_WEB &&
      data.imported
    ) {
      setStatus("next");
      setHasCredential(true);
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
  }, [hasCredential]);

  const init = async () => {
    const { getCredentialByCHash } = window?.zCloak?.zkID;

    const hasCredential = await getCredentialByCHash(CTYPE_HASH);
    if (hasCredential) {
      setStatus("next");
      setHasCredential(true);
    } else {
      setStatus("import");
    }
  };

  useEffect(() => {
    if (window?.zCloak?.zkID) {
      init();
    }
  }, []);

  const detail = BUTTON_MESSAGE_STATUS[status];

  return (
    <div className="step-wrapper">
      <div className="title">{GUIDE_DESC.importCredential.title}</div>
      <div className="sub-title">{GUIDE_DESC.importCredential.desc}</div>
      <img src={bg} alt="" className="import-bg" />
      <Button
        size="default"
        className={classNames("btn", {
          "import-credential-btn": status === "import",
        })}
        onClick={detail.func}
        loading={!!detail.buttonType}
      >
        {detail.buttonText}
      </Button>
    </div>
  );
};
export default ThirdStep;
