/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-19 10:42:40
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
  CTYPE_HASH,
  ZK_PROGRAM,
  GUIDE_CREDENTIAL,
  GUIDE_DESC,
} from "../../constants/guide";
import { IProof } from "./index";
import { ICredential } from "./index";

import failImg from "../../images/fail.webp";
import successImg from "../../images/success.webp";

type UploadStatus = "uploading" | "success" | "prepare" | "fail" | "uploaded";

type UploadResult = "success" | "fail";

interface IProps {
  credentail: ICredential | null;
  handleNext: () => void;
  handleProof: (proof: boolean) => void;
}

const TIME = 3000;

const FifthStep: React.FC<IProps> = ({
  credentail,
  handleNext,
  handleProof,
}) => {
  const { account } = useWeb3React();
  const [proof, setProof] = useState<IProof | null>(null);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [interval, setIntervalStatus] = useState<number | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

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
    const credentailLocal = localStorage.getItem(GUIDE_CREDENTIAL) || "";

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
      return GUIDE_DESC.uploadProof;
    }
    if (uploadStatus && ["uploading", "uploaded"].includes(uploadStatus)) {
      return GUIDE_DESC.verifyingProof;
    }
    if (uploadStatus === "success") {
      return GUIDE_DESC.proofVerified;
    }

    return GUIDE_DESC.uploadProof;
  }, [uploadStatus]);

  return (
    <div className="step-wrapper">
      <div className="title">{text.title}</div>
      <div className="sub-title">{text.desc}</div>
      {uploadStatus && ["uploading", "uploaded"].includes(uploadStatus) && (
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
      {uploadStatus === "prepare" && account && (
        <FifthStepSubmit
          account={account}
          cTypeHash={CTYPE_HASH}
          cTypeName={CTYPE.title}
          fieldName={ZK_PROGRAM.filed}
          proHash={ZK_PROGRAM.hash}
          proName={ZK_PROGRAM.name}
          programDetail={ZK_PROGRAM.detailString}
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
