/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-12 20:54:18
 * @LastEditTime: 2022-04-13 11:08:34
 */
import React from "react";
import bgPerson from "../../images/bg_person.svg";
import attested from "../../images/attested.svg";
import { credentialClass } from "../../constants/guide";

import "./SecondStepCredential.scss";

type Props = {
  data: {
    body: {
      content: any;
    };
  };
};

const SecondStepCredential: React.FC<Props> = ({ data }) => {
  const {
    class: classType,
    age,
    chest_rarity,
    helmet_rarity,
    name,
    weapon_rarity,
  } = data?.body?.content?.request.claim.contents;
  const claName = credentialClass.find((it) => it.value === classType).name;

  return (
    <div className="credential">
      <img src={bgPerson} className="bg-left" alt="attested" />
      <img src={attested} alt="attested" className="attested-img" />
      <div className="detail">
        <div className="detial-item name-item">
          <span className="label">Name:</span>
          <span className="value">{name}</span>
        </div>
        <div className="detial-item">
          <span className="label">Age:</span>
          <span className="value">{age}</span>
        </div>
        <div className="detial-item">
          <span className="label">Class:</span>
          <span className="value">{claName}</span>
        </div>
        <div className="detial-item">
          <span className="label">Helmet:</span>
          <span className="value">{helmet_rarity}</span>
        </div>
        <div className="detial-item">
          <span className="label">Chest:</span>
          <span className="value">{chest_rarity}</span>
        </div>
        <div className="detial-item">
          <span className="label">Weapon:</span>
          <span className="value">{weapon_rarity}</span>
        </div>
      </div>
    </div>
  );
};
export default SecondStepCredential;
