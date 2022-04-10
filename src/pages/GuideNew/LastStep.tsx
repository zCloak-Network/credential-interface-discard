/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-09 17:35:09
 */
import React from "react";
import bg from "../../images/step_install.svg";
import Button from "../../components/Button";

const LastStep: React.FC = () => {
  return (
    <div className="step-wrapper">
      <div className="title">Claim NFT</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      <img src={bg} alt="" className="install-bg" />
      <Button className="btn">Claim NFT</Button>
      {/* <Button className="btn">Install</Button> */}
    </div>
  );
};
export default LastStep;
