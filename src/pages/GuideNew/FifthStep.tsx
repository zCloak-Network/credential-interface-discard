/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-13 12:00:48
 */
import React from "react";
import Button from "../../components/Button";
import FifthStepSubmit from "./FifthStepSubmit";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import RuleModal from "./RuleModal";

const FifthStep: React.FC = () => {
  const { account, error, activate } = useWeb3React();

  return (
    <div className="step-wrapper">
      <div className="title">Upload proof</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      <FifthStepSubmit
        account={account}
        cTypeHash={"0xxxxxxxxx"}
        fieldName="age"
        proHash="0xxxxxxxxx"
        proName="age > 1"
        programDetail=""
      />
      <RuleModal />
    </div>
  );
};
export default FifthStep;
