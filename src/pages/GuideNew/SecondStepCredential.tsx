/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-12 20:54:18
 * @LastEditTime: 2022-04-12 21:23:30
 */
import React from "react";
import bgPerson from "../../images/bg_person.svg";
import { credentialClass } from "../../constants/guide";

import "./SecondStepCredential.scss";

type Props = {
  //   class: number;
};

const SecondStepCredential: React.FC<Props> = () => {
  const claName = credentialClass.find((it) => it.value === 1).name;

  return (
    <div className="credential">
      <img src={bgPerson} className="bg-left" />
      <div className="detail">
        <div className="detial-item name-item">
          <span className="label">Name:</span>
          <span className="value">Bob</span>
        </div>
        <div className="detial-item">
          <span className="label">Age:</span>
          <span className="value">26</span>
        </div>
        <div className="detial-item">
          <span className="label">Class:</span>
          <span className="value">{claName}</span>
        </div>
        <div className="detial-item">
          <span className="label">Helmet:</span>
          <span className="value">4</span>
        </div>
        <div className="detial-item">
          <span className="label">Chest:</span>
          <span className="value">5</span>
        </div>
        <div className="detial-item">
          <span className="label">Weapon:</span>
          <span className="value">5</span>
        </div>
      </div>
    </div>
  );
};
export default SecondStepCredential;
