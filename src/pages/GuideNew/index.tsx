/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-05-09 16:12:52
 */
import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import classNames from "classnames";
import GuideGate from "../GuideGate";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import LastStep from "./LastStep";
import GuideHeader from "../../components/GuideHeader";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { GUIDECREDENTIAL } from "../../constants/guide";
import { getProof } from "../../services/api";
import { ethers } from "ethers";
import { fromWei } from "web3-utils";

import "./index.scss";

const { Step } = Steps;

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

/*tsModel1*/
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

const GuideNew: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [credentail, setCredentail] = useState();
  const [proof, setProof] = useState();
  const [balance, setBalance] = useState<string>();
  const { account } = useWeb3React();

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const getProofData = async (claimHash) => {
    const res = await getProof({
      rootHash: claimHash,
    });

    if (res.data.code === 200) {
      const data = res.data.data;

      if (Object.keys(data).length > 0) {
        setCurrent(4);
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
      content: <FourthStep handleNext={handleNext} balance={balance} />,
    },
    {
      title: "Fifth",
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
    const credentail = localStorage.getItem(GUIDECREDENTIAL);

    if (credentail) {
      const claimHash =
        JSON.parse(credentail)?.body?.content?.attestation.claimHash;

      getProofData(claimHash);
    }
  }, []);

  useEffect(() => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(Web3.givenProvider);

      provider.on("block", async () => {
        const _balance = await provider.getBalance(account);

        const formatBalance = Number(fromWei(String(_balance))).toFixed(4);

        setBalance(formatBalance);
      });

      return () => {
        provider.removeAllListeners();
      };
    }
  }, [account]);

  return (
    <div className="guide-new">
      <GuideHeader balance={balance} />
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
          <Steps current={current}>
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

const GuideNewWrapper: React.FC = () => {
  return (
    <GuideGate>
      <GuideNew />
    </GuideGate>
  );
};

export default GuideNewWrapper;
