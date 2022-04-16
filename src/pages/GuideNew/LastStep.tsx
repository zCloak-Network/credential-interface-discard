/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-16 17:24:12
 */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import { getContract } from "../../utils/web3Utils";
import abi from "../../constants/contract/contractAbi/Poap";
import { PoapAdddress } from "../../constants/contract/address";
import { useAddPopup } from "../../state/application/hooks";

import bg from "../../images/step_install.svg";

const LastStep: React.FC = () => {
  const addPopup = useAddPopup();
  const { account } = useWeb3React();
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  const jumpToZKID = () => {
    //
  };

  const claimPoap = () => {
    const contract = getContract(abi, PoapAdddress);
    setClaimLoading(true);
    contract.methods
      .claim()
      .send({
        from: account,
      })
      .then(function (receipt) {
        console.log("addReceipt", receipt);
        if (receipt) {
          // setLoading(false);
          // handleNext();
          addPopup(
            {
              txn: {
                hash: receipt.transactionHash,
                success: true,
                title: "Claim Success",
                summary: "You have claimed a POAP successfully.",
              },
            },
            receipt.transactionHash
          );
        }
      });
  };

  useEffect(() => {
    const contract = getContract(abi, PoapAdddress);
    contract.events.MintPoap({}, (error, event) => {
      console.log(445555, error, event);
    });
  }, []);

  return (
    <div className="step-wrapper">
      <div className="title">Claim POAP</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      <img src={bg} alt="" className="install-bg" />

      {isClaimed ? (
        <Button className="btn" onClick={jumpToZKID}>
          Go to zkID
        </Button>
      ) : (
        <Button
          size="default"
          className="btn"
          onClick={claimPoap}
          loading={claimLoading}
        >
          Claim POAP
        </Button>
      )}
    </div>
  );
};
export default LastStep;
