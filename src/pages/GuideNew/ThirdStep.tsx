/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-13 17:26:28
 */
import React from "react";
import bg from "../../images/step_import.svg";
import Button from "../../components/Button";

const ThirdStep: React.FC = () => {
  return (
    <div className="step-wrapper">
      <div className="title">Import Credential</div>
      <div className="sub-title">
        Please open the extension and click the Import button
      </div>
      <img src={bg} alt="" className="import-bg" />
      <Button className="btn">Import Credential</Button>
    </div>
  );
};
export default ThirdStep;
