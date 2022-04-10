/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-09 17:45:02
 */
import React from "react";
import Button from "../../components/Button";

const FifthStep: React.FC = () => {
  return (
    <div className="step-wrapper">
      <div className="title">Upload proof</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>

      <Button className="btn">Submit</Button>
      {/* <Button className="btn">Install</Button> */}
    </div>
  );
};
export default FifthStep;
