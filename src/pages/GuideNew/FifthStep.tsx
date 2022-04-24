/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-24 14:19:03
 */
import React, { useState, useEffect } from "react";
import { useInterval } from "ahooks";
import Button from "../../components/Button";
import FifthStepSubmit from "./FifthStepSubmit";
import { useWeb3React } from "@web3-react/core";
import RuleModal from "./RuleModal";
import Uploading from "./Uploading";
import { getProof } from "../../services/api";
import { CTYPE, CTYPEHASH, ZKPROGRAM } from "../../constants/guide";

import failImg from "../../images/fail.svg";
import successImg from "../../images/success.svg";

type UploadStatus = "uploading" | "success" | "prepare" | "fail" | "uploaded";

type UploadResult = "success" | "fail";

type Props = {
  credentail: any;
  handleNext: () => void;
  handleProof: (proof) => void;
  updateBalance: () => void;
};

const TIME = 12000;

const FifthStep: React.FC<Props> = ({
  credentail,
  handleNext,
  handleProof,
  updateBalance,
}) => {
  const { account } = useWeb3React();
  const [proof, setProof] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  const [interval, setInterval] = useState(undefined);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("prepare");
  const [result, setResult] = useState<UploadResult>();

  useEffect(() => {
    if (uploadStatus === "uploading") {
      handleProof(true);
      setInterval(TIME);
    } else {
      handleProof(false);
    }
  }, [uploadStatus]);

  const getProofData = async () => {
    const claimHash = credentail?.body?.content?.attestation.claimHash;

    const res = await getProof({
      rootHash: claimHash,
    });

    if (res.data.code === 200) {
      const data = res.data.data;

      if (Object.keys(data).length === 0 && !isSubmited) {
        // 没有提交过
        setInterval(undefined);
        setUploadStatus("prepare");
      } else {
        const { verified, finished } = data;

        if (!verified && finished) {
          // 如果已经完成, 且失败
          setInterval(undefined);
          setResult("fail");
          setUploadStatus("uploaded");
          setProof(data);
          handleProof(true);
        } else if (verified && finished) {
          // 如果已经完成,且成功
          setInterval(undefined);
          setResult("success");
          setUploadStatus("uploaded");
          setProof(data);
          handleProof(true);
        } else if (!finished && !verified) {
          // 正在验证
          setInterval(TIME);
          setUploadStatus("uploading");
        }
      }
    }
  };

  const handleUploadingNext = () => {
    setUploadStatus(result);
  };

  useEffect(() => {
    getProofData();
    updateBalance();
  }, []);

  useInterval(() => {
    getProofData();
  }, interval);

  return (
    <div className="step-wrapper">
      <div className="title">Upload proof</div>
      <div className="sub-title">
        Some magic just happened! You just got your zk-Portrait along with a
        STARK proof. Upload the proof and our scholars will check its validity.
      </div>
      {["uploading", "uploaded"].includes(uploadStatus) && (
        <Uploading
          data={proof}
          uploaded={Boolean(uploadStatus === "uploaded")}
          handleNext={handleUploadingNext}
        />
      )}
      {uploadStatus === "fail" && (
        <div className="upload-fail">
          <div className="upload-fail-content">
            <img src={failImg} alt="fail" />
            <span>Your proof is verified False, You can‘t get an NFT.</span>
          </div>
          <Button className="btn" onClick={handleNext}>
            Next
          </Button>
        </div>
      )}
      {uploadStatus === "success" && (
        <div className="upload-success">
          <div className="upload-success-content">
            <img src={successImg} alt="success" />
            <span>Your proof is verified true, You can get a POAP.</span>
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
            setIsSubmited(true);
            setUploadStatus("uploading");
            setInterval(TIME);
            updateBalance();
          }}
        />
      )}
      <RuleModal />
    </div>
  );
};
export default FifthStep;
