/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-04-10 22:20:49
 */
import React, { useState } from "react";
import { Steps } from "antd";
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
  const [current, setCurrent] = useState(3);
  const handleNext = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: "First",
      content: <FirstStep />,
    },
    {
      title: "Second",
      content: <SecondStep />,
    },
    {
      title: "Third",
      content: <ThirdStep />,
    },
    {
      title: "Fourth",
      content: <FourthStep handleNext={handleNext} />,
    },
    {
      title: "Fifth",
      content: <FifthStep />,
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
        <div className="guide-new-container-wrapper">
          <div className="guide-new-container-bg"></div>
          <div className="guide-new-container">
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
