/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-09 11:42:39
 */
import React from "react";
import bg from "../../images/step_install.svg";
import Button from "../../components/Button";

const FirstStep: React.FC = () => {
  // const [selectItem, setSelectItem] = useState();

  return (
    <div className="step-wrapper">
      <div className="title">Install extension</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      <img src={bg} alt="" className="install-bg" />
      <Button className="btn">Install</Button>
      {/* <Button className="btn">Install</Button> */}
    </div>
  );
};
export default FirstStep;
