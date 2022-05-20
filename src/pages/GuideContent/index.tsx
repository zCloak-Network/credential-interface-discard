/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-05-20 16:38:49
 */
import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import classNames from "classnames";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FifthStep from "./FifthStep";
import LastStep from "./LastStep";
import { GUIDE_CREDENTIAL } from "../../constants/guide";
import { getProof } from "../../services/api";
import {
  IMessage,
  IDidDetails,
  IAttestation,
  IRequestForAttestation,
} from "@kiltprotocol/types";

import "./index.scss";

const { Step } = Steps;

export interface ICredential {
  body: {
    content: {
      attestation: IAttestation;
      request: IRequestForAttestation;
    };
  };
  createdAt: number;
  sender: IDidDetails["did"];
  receiver: IDidDetails["did"];
  messageId?: string;
  receivedAt?: number;
  inReplyTo?: IMessage["messageId"];
  references?: Array<IMessage["messageId"]>;
}
export interface IVerifying {
  _id: string;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  blockTime: number;
  cOwner: string;
  requestHash: string;
  worker: string;
  outputHash: string;
  rootHash: string;
  attester: string;
  isPassed: boolean;
  calcResult: number[];
  __v: number;
}
export interface IProof {
  _id: string;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  blockTime: number;
  dataOwner: string;
  attester: string;
  cType: string;
  programHash: string;
  fieldNames: string[];
  proofCid: string;
  requestHash: string;
  rootHash: string;
  expectResult: number[];
  __v: number;
  verifying: IVerifying[];
  finished: boolean;
  verified: boolean;
}

const GuideContent: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [credentail, setCredentail] = useState<ICredential | null>(null);
  const [proof, setProof] = useState<boolean>();

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const getProofData = async (claimHash: string) => {
    const res = await getProof({
      rootHash: claimHash,
    });

    if (res.data.code === 200) {
      const data = res.data.data;

      if (Object.keys(data).length > 0) {
        setCurrent(3);
      }
    }
  };

  const steps = [
    {
      title: "First",
      content: <FirstStep handleNext={handleNext} />,
    },
    {
      title: "Second",
      content: (
        <SecondStep
          handleNext={handleNext}
          handleCredentail={(data) => {
            setCredentail(data);
          }}
        />
      ),
    },
    {
      title: "Third",
      content: <ThirdStep handleNext={handleNext} />,
    },
    {
      title: "Fourth",
      content: (
        <FifthStep
          handleNext={handleNext}
          credentail={credentail}
          handleProof={(data) => {
            setProof(data);
          }}
        />
      ),
    },
    {
      title: "Last",
      content: <LastStep />,
    },
  ];

  useEffect(() => {
    const credentail = localStorage.getItem(GUIDE_CREDENTIAL);

    if (credentail) {
      const claimHash =
        JSON.parse(credentail)?.body?.content?.attestation.claimHash;

      claimHash && getProofData(claimHash);
    }
  }, []);

  return (
    <div className="guide-new">
      <div
        className={classNames("guide-new-container-wrapper", {
          "get-credential": current === 1 && !credentail,
          "credential-wrapper": current === 1 && !!credentail,
          "import-credential": current === 2,
          "upload-proof": current === 4 && !proof,
          "has-proof": current === 4 && !!proof,
        })}
      >
        <div className="guide-new-container" id="content">
          <Steps current={current} className="guide-step">
            {steps.map((item, index) => (
              <Step
                key={item.title}
                title={null}
                status={index > current ? "wait" : "process"}
              />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </div>
    </div>
  );
};

export default GuideContent;
