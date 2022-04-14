/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-14 16:50:32
 */
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import FifthStepSubmit from "./FifthStepSubmit";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import RuleModal from "./RuleModal";
import Img from "../../images/success.svg";
import { CTYPE, CTYPEHASH, ZKPROGRAM } from "../../constants/guide";

type UploadStatus = "uploading" | "success" | "prepare";

type Props = {
  handleNext: () => void;
  handleProof: (proof) => void;
};

const FifthStep: React.FC<Props> = ({ handleNext }) => {
  const { account, error, activate } = useWeb3React();
  const [uploadStatus, setUploadStatus] = useState("prepare");

  return (
    <div className="step-wrapper">
      <div className="title">Upload proof</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
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
        />
      )}
      <RuleModal />
    </div>
  );
};
export default FifthStep;
