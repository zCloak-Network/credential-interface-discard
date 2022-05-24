/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-05-24 17:16:28
 */
import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import classNames from "classnames";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import LastStep from "./LastStep";
import { useWeb3React } from "@web3-react/core";
import {
  CTYPE_HASH,
  ZK_PROGRAM,
  ADMIN_ATTESTER_ADDRESS,
} from "../../constants/guide";
import { getProof } from "../../services/api";
import {
  IMessage,
  IDidDetails,
  IAttestation,
  IRequestForAttestation,
} from "@kiltprotocol/types";
import { decodeAddress } from "@polkadot/keyring";
import { stringToHex, u8aToHex } from "@polkadot/util";
import { getRequestHash } from "../../utils";

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
  const { account } = useWeb3React();
  const [current, setCurrent] = useState<number>(0);
  const [credentail, setCredentail] = useState<ICredential | null>(null);
  const [proof, setProof] = useState<boolean>();

  const handleNext = () => {
    setCurrent(current + 1);
  };

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
        <FourthStep
          handleNext={handleNext}
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
    getProofData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="guide-new">
      <div
        className={classNames("guide-new-container-wrapper", {
          "get-credential": current === 1 && !credentail,
          "credential-wrapper": current === 1 && !!credentail,
          "import-credential": current === 2,
          "upload-proof": current === 3 && !proof,
          "has-proof": current === 3 && !!proof,
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
