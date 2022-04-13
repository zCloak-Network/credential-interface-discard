/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-13 19:56:27
 */
import React, { useEffect, useState } from "react";
import bg from "../../images/step_install.svg";
import Button from "../../components/Button";
import { CTYPEHASH, MESSAGECODE } from "../../constants/guide";

type Props = {
  handleNext: () => void;
};

const FirstStep: React.FC<Props> = ({ handleNext }) => {
  const [status, setStatus] = useState<string>("next");
  // const;

  const handleInstall = () => {
    window.open("https://metamask.io/");
  };

  const STATUS = {
    install: {
      buttonText: "Install",
      buttonType: null,
      func: handleInstall,
      message: null,
      messageType: null,
    },
    // connect: {
    //   buttonText: "connect wallet",
    //   buttonType: null,
    //   func: handleConnect,
    //   message: null,
    //   messageType: null,
    // },
    extensionNext: {
      buttonText: "loading",
      buttonType: "loading",
      func: null,
      message: "Please sign the message in your wallet",
      messageType: "warning",
    },
    extensionCreate: {
      buttonText: "loading",
      buttonType: "loading",
      func: null,
      message: "Please sign the message in your wallet",
      messageType: "warning",
    },
    // switch: {
    //   buttonText: "Switch network",
    //   buttonType: null,
    //   func: handleSwitch,
    //   message: "You are on the wrong network",
    //   messageType: "error",
    // },
    next: {
      buttonText: "Next",
      buttonType: null,
      func: handleNext,
      message: null,
      messageType: null,
    },
  };

  // useEffect(() => {
  //   console.log(9999, window?.zCloak?.zkID, !window?.zCloak?.zkID);
  //   console.log(999934, window.web3);
  //   if (!window?.zCloak?.zkID) {
  //     setStatus("install");
  //     return;
  //   }

  //   setStatus("next");
  // }, []);

  const detail = STATUS[status];

  const getExtension = async () => {
    console.log(91111, window);
    const { getCredentialByCHash } = window?.zCloak?.zkID;

    console.log(9222, window);
    const hasCredentail = await getCredentialByCHash(CTYPEHASH);

    if (hasCredentail) {
      setStatus("next");
    } else {
    }
    console.log(454545, hasCredentail);
  };

  // useEffect(() => {
  //   if (window?.zCloak?.zkID) {
  //     getExtension();
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     const code = event.data.statusCode;
  //     if (code === MESSAGECODE.SEND_NEXT_TO_WEB) {
  //     }
  //   });
  // }, []);

  console.log(99991111, status, detail);
  return (
    <div className="step-wrapper">
      <div className="title">Install extension</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      <img src={bg} alt="" className="install-bg" />
      <Button className="btn" onClick={detail.func}>
        {detail.buttonText}
      </Button>
      {/* <Button className="btn">Install</Button> */}
    </div>
  );
};
export default FirstStep;
