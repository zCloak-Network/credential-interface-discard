/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-24 19:44:19
 */
import { useState, useEffect, useMemo, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { useInterval } from "ahooks";
import Button from "../../components/Button";
import FourthStepSubmit from "./FourthStepSubmit";
import RuleModal from "./RuleModal";
import Uploading from "./Uploading";
import { getProof, getToken } from "../../services/api";
import { InitDataContext } from "../Guide";
import { getRequestHash } from "../../utils";
import { decodeAddress } from "@polkadot/keyring";
import { stringToHex, u8aToHex } from "@polkadot/util";
import {
  CTYPE,
  CTYPE_HASH,
  ZK_PROGRAM,
  GUIDE_DESC,
  ADMIN_ATTESTER_ADDRESS,
} from "../../constants/guide";
import { IProof } from "./index";

import failImg from "../../images/fail.webp";
import successImg from "../../images/success.webp";

type UploadStatus = "uploading" | "success" | "prepare" | "fail" | "uploaded";

type UploadResult = "success" | "fail";

interface IProps {
  jumpStep: (step: number) => void;
  handleProof: (proof: boolean) => void;
}

const TIME = 3000;

const FourthStep: React.FC<IProps> = ({ handleProof, jumpStep }) => {
  const { account } = useWeb3React();
  const initData = useContext(InitDataContext);
  const [proof, setProof] = useState<IProof | null>(null);
  const [getTokenLoading, setGetTokenLoading] = useState<boolean>(false);
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

  const getProofData = async () => {
    if (!account) return;

    const requestHash = getRequestHash({
      cType: CTYPE_HASH,
      programHash: ZK_PROGRAM.hash,
      fieldNames: ZK_PROGRAM.filed.split(",").map((it) => stringToHex(it)),
      attester: u8aToHex(decodeAddress(ADMIN_ATTESTER_ADDRESS)),
    });

    const res = await getProof({
      dataOwner: account,
      requestHash,
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

  const handleToken = async () => {
    if (account) {
      await setGetTokenLoading(true);
      await getToken({ address: account });
    }
  };

  useEffect(() => {
    if (initData.proof && Object.keys(initData.proof).length > 0) {
      setProof(initData.proof);
      setUploadStatus("uploaded");
      setResult("success");
      handleProof(true);
    } else {
      getProofData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData]);

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

  const getContent = () => {
    // Insufficient balance
    if (initData.balance === "0.0000") {
      return (
        <div className="upload-fail">
          <div className="upload-fail-content">
            <img src={failImg} alt="fail" />
            <span
              style={{
                marginRight: "88px",
              }}
            >
              Sorry, you don’t have token.
            </span>
          </div>
          <Button
            size="default"
            className="btn"
            onClick={handleToken}
            loading={getTokenLoading}
          >
            Get token
          </Button>
        </div>
      );
    }

    // uploading
    if (uploadStatus && ["uploading", "uploaded"].includes(uploadStatus)) {
      return (
        <Uploading
          data={proof}
          uploaded={Boolean(uploadStatus === "uploaded")}
          handleNext={handleUploadingNext}
        />
      );
    }

    // upload fail
    if (uploadStatus === "fail") {
      return (
        <div className="upload-fail">
          <div className="upload-fail-content">
            <img src={failImg} alt="fail" />
            <span>Your proof is verified False, You can‘t get an NFT.</span>
          </div>
          {/* <Button className="btn" onClick={handleNext}>
            Next
          </Button> */}
        </div>
      );
    }

    // upload success
    if (uploadStatus === "success") {
      return (
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
          <Button
            className="btn"
            onClick={() => {
              jumpStep(4);
            }}
          >
            Next
          </Button>
        </div>
      );
    }

    // not upload and submit
    if (uploadStatus === "prepare" && account) {
      return (
        <FourthStepSubmit
          account={account}
          cTypeHash={CTYPE_HASH}
          cTypeName={CTYPE.title}
          fieldName={ZK_PROGRAM.filed}
          proHash={ZK_PROGRAM.hash}
          proName={ZK_PROGRAM.name}
          programDetail={ZK_PROGRAM.detailString}
          jumpStep={jumpStep}
          handleNext={() => {
            setIsSubmited(true);
            setUploadStatus("uploading");
            setIntervalStatus(TIME);
          }}
        />
      );
    }
  };

  return (
    <div className="step-wrapper">
      <div className="title">{text.title}</div>
      <div className="sub-title">{text.desc}</div>
      {getContent()}
      <RuleModal />
    </div>
  );
};
export default FourthStep;
