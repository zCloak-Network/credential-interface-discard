/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-16 20:15:52
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

import Img from "../../images/success.svg";

type UploadStatus = "uploading" | "success" | "prepare" | "fail";

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
  const [proof, setProof] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  const [interval, setInterval] = useState(undefined);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("prepare");

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
          setUploadStatus("fail");
          setProof(data);
        } else if (verified && finished) {
          // 如果已经完成,且成功
          setInterval(undefined);
          setUploadStatus("success");
          setProof(data);
        } else if (!finished && !verified) {
          // 正在验证
          setInterval(TIME);
          setUploadStatus("uploading");
        }
      }
    }
  };

  useEffect(() => {
    getProofData();
  }, []);

  useInterval(() => {
    getProofData();
  }, interval);

  return (
    <div className="step-wrapper">
      <div className="title">Upload proof</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      {uploadStatus === "uploading" && <Uploading data={proof} />}
      {uploadStatus === "fail" && <div>fail</div>}
      {uploadStatus === "success" && (
        <div className="upload-success">
          <div className="upload-success-content">
            <img src={Img} alt="success" />
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
          }}
        />
      )}
      <RuleModal />
    </div>
  );
};
export default FifthStep;
