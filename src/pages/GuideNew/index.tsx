/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-04-18 16:39:28
 */
import React, { useState } from "react";
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

import "./index.scss";

const { Step } = Steps;

const GuideNew: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [credentail, setCredentail] = useState();
  const [proof, setProof] = useState();

  const handleNext = () => {
    setCurrent(current + 1);
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
      content: <FourthStep handleNext={handleNext} />,
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

  return (
    <GuideGate>
      <div className="guide-new">
        <GuideHeader />
        <div
          className={classNames("guide-new-container-wrapper", {
            "get-credential": current === 1 && !credentail,
            "credential-wrapper": current === 1 && !!credentail,
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
    </GuideGate>
  );
};
export default GuideNew;
