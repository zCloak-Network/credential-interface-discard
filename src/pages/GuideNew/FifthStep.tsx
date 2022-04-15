/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-15 15:48:12
 */
import React, { useState, useEffect } from "react";
import { useInterval } from "ahooks";
import Button from "../../components/Button";
import FifthStepSubmit from "./FifthStepSubmit";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import RuleModal from "./RuleModal";
import Uploading from "./Uploading";
import { CTYPE, CTYPEHASH, ZKPROGRAM } from "../../constants/guide";

import Img from "../../images/success.svg";

type UploadStatus = "uploading" | "success" | "prepare";

type Props = {
  credentail: any;
  handleNext: () => void;
  handleProof: (proof) => void;
};

const TIME = 12000;

const FifthStep: React.FC<Props> = ({
  credentail,
  handleNext,
  handleProof,
}) => {
  const { account } = useWeb3React();
  const [interval, setInterval] = useState(undefined);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("prepare");

  useEffect(() => {
    if (uploadStatus !== "prepare") {
      handleProof(true);
      setInterval(TIME);
    } else {
      handleProof(false);
    }
  }, [uploadStatus]);

  const getProof = () => {
    // if (!!countdown) {
    //   setCountdown(countdown - 1000);
    // } else {
    //   setInterval(undefined);
    // }
  };

  useInterval(() => {
    getProof();
  }, interval);

  return (
    <div className="step-wrapper">
      <div className="title">Upload proof</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      {uploadStatus === "uploading" && <Uploading />}
      {uploadStatus === "success" && (
        <div className="upload-success">
          <div className="upload-success-content">
            <img src={Img} alt="success" />
            <span>Your proof is verified true, You can get an POAP.</span>
          </div>
          <Button className="btn" onClick={handleNext}>
            Next
          </Button>
        </div>
      )}
      {uploadStatus === "prepare" && (
        <FifthStepSubmit
          account={account}
          cTypeHash={CTYPEHASH}
          cTypeName={CTYPE.title}
          fieldName={ZKPROGRAM.filed}
          proHash={ZKPROGRAM.hash}
          proName={ZKPROGRAM.name}
          programDetail={ZKPROGRAM.detailString}
          handleNext={() => {
            setUploadStatus("uploading");
          }}
        />
      )}
      <RuleModal />
    </div>
  );
};
export default FifthStep;
