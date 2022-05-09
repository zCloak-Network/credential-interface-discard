/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-09 16:12:42
 */
import React, { useState, useEffect, useMemo } from "react";
import { useInterval } from "ahooks";
import Button from "../../components/Button";
import FifthStepSubmit from "./FifthStepSubmit";
import { useWeb3React } from "@web3-react/core";
import RuleModal from "./RuleModal";
import Uploading from "./Uploading";
import { getProof } from "../../services/api";
import {
  CTYPE,
  CTYPEHASH,
  ZKPROGRAM,
  GUIDECREDENTIAL,
  GUIDEDESC,
} from "../../constants/guide";
import { ISubmitAttestation } from "../../types/claim";
import { IProof } from "./index";

import failImg from "../../images/fail.svg";
import successImg from "../../images/success.svg";

type UploadStatus = "uploading" | "success" | "prepare" | "fail" | "uploaded";

type UploadResult = "success" | "fail";

type Props = {
  credentail: ISubmitAttestation;
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
  const [proof, setProof] = useState<IProof>();
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [interval, setIntervalStatus] = useState<number | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(null);
  const [result, setResult] = useState<UploadResult>();

  useEffect(() => {
    if (uploadStatus === "uploading") {
      handleProof(true);
      setIntervalStatus(TIME);
    } else {
      handleProof(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadStatus]);

  const getClaimHash = () => {
    const credentailLocal = localStorage.getItem(GUIDECREDENTIAL);

    const data = JSON.parse(credentailLocal) || credentail;

    return data?.body?.content?.attestation.claimHash;
  };

  const getProofData = async () => {
    const claimHash = getClaimHash();

    const res = await getProof({
      rootHash: claimHash,
    });

    if (res.data.code === 200) {
      const data = res.data.data;

      if (Object.keys(data).length === 0 && !isSubmited) {
        // if submitted
        setIntervalStatus(undefined);
        setUploadStatus("prepare");
      } else {
        const { verified, finished } = data;

        if (!verified && finished) {
          // if finished and failed
          setIntervalStatus(undefined);
          setUploadStatus("uploaded");
          // if (isFirst) {
          //   setUploadStatus("fail");
          // } else {
          //   setUploadStatus("uploaded");
          // }
          setResult("fail");
          setProof(data);
          handleProof(true);
        } else if (verified && finished) {
          // if finished and success
          setIntervalStatus(undefined);
          setUploadStatus("uploaded");
          // if (isFirst) {
          //   setUploadStatus("success");
          // } else {
          //   setUploadStatus("uploaded");
          // }
          setResult("success");

          setProof(data);
          handleProof(true);
        } else if (!finished && !verified) {
          // if verifing
          setIntervalStatus(TIME);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    getProofData();
  }, interval);

  const text = useMemo(() => {
    if (uploadStatus === "prepare") {
      return GUIDEDESC.uploadProof;
    }
    if (["uploading", "uploaded"].includes(uploadStatus)) {
      return GUIDEDESC.verifyingProof;
    }
    if (uploadStatus === "success") {
      return GUIDEDESC.proofVerified;
    }

    return GUIDEDESC.uploadProof;
  }, [uploadStatus]);

  return (
    <div className="step-wrapper">
      <div className="title">{text.title}</div>
      <div className="sub-title">{text.desc}</div>
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
            <span className="upload-success-content-tip">
              <span>Congratulations! Your STARK proof has been verified.</span>
              <span
                style={{
                  textAlign: "center",
                }}
              >
                You can get a POAP now.
              </span>
            </span>
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
            setIntervalStatus(TIME);
          }}
        />
      )}
      <RuleModal />
    </div>
  );
};
export default FifthStep;
