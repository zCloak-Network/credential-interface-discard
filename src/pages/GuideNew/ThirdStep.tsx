/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-21 11:52:47
 */
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { CTYPEHASH, MESSAGECODE } from "../../constants/guide";
import { openMessage, destroyMessage } from "../../utils/message";

import bg from "../../images/step_import.svg";
import classNames from "classnames";

type Props = {
  handleNext: () => void;
};

const messageKey = "importCredential";

const ThirdStep: React.FC<Props> = ({ handleNext }) => {
  const [status, setStatus] = useState<string>("next");
  const [hasCredential, setHasCredential] = useState<boolean>(false);

  const openExtension = async () => {
    const { openzkIDPopup } = window?.zCloak?.zkID;
    openzkIDPopup(MESSAGECODE.OPEN_IMPORT_CREDENTIAL);
    setStatus("extensionImport");
    const data = STATUS.extensionImport;
    openMessage(data.message, data.messageType, messageKey);
  };

  const STATUS = {
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

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { statusCode, data } = event.data;
      if (statusCode === MESSAGECODE.EXTENSION_CLOSED) {
        if (!hasCredential) {
          setStatus("import");
        } else {
          setStatus("next");
        }

        destroyMessage(messageKey);
      }

      if (
        statusCode === MESSAGECODE.SEND_IMPORT_CREDENTIAL_SUCCESS_TO_WEB &&
        data.imported
      ) {
        setStatus("next");
        destroyMessage(messageKey);
      }
    });
  }, [hasCredential]);

  const init = async () => {
    const { getCredentialByCHash } = window?.zCloak?.zkID;

    const hasCredential = await getCredentialByCHash(CTYPEHASH);
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

  const detail = STATUS[status];

  return (
    <div className="step-wrapper">
      <div className="title">Import Credential</div>
      <div className="sub-title">
        Mr. Thunderbrew—hope he is sober today—has checked your documents and he
        thinks your data are good. He will issue a credential to you. As we
        value your privacy, we will generate a zk-Portrait for you to claim your
        POAP. Your credential will be hidden from the outside world.
      </div>
      <img src={bg} alt="" className="import-bg" />
      <Button
        size="default"
        className={classNames("btn", {
          "import-credential-btn": status === "import",
        })}
        onClick={detail.func}
        loading={detail.buttonType}
      >
        {detail.buttonText}
      </Button>
    </div>
  );
};
export default ThirdStep;
