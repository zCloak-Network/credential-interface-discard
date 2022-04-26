/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-04-26 15:44:49
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

import "./index.scss";

const { Step } = Steps;

const GuideNew: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [credentail, setCredentail] = useState();
  const [proof, setProof] = useState();
  const [balance, setBalance] = useState<string>();
  const { account } = useWeb3React();

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const getBalance = async () => {
    if (account) {
      const web3 = new Web3(Web3.givenProvider);
      const balance = await web3.eth.getBalance(account);

      const formatBalance = Number(web3.utils.fromWei(balance)).toFixed(4);

      console.log("balance*****:", balance);
      setBalance(formatBalance);
    }
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
      content: (
        <FourthStep
          handleNext={handleNext}
          balance={balance}
          updateBalance={getBalance}
        />
      ),
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
          updateBalance={getBalance}
        />
      ),
    },
    {
      title: "Last",
      content: <LastStep updateBalance={getBalance} />,
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
    getBalance();
  }, [account]);

  // useEffect(() => {
  //   if (account) {
  //     const web3 = new Web3(Web3.givenProvider);
  //     web3.eth
  //       .subscribe("logs", {
  //         address: account,
  //       })
  //       .on("data", function (log) {
  //         console.log(344444, log);
  //       });
  //   }
  // }, [account]);

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
        {/* <div className="guide-new-container-bg"></div> */}
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
