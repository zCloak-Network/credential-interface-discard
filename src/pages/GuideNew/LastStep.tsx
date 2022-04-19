/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-18 16:28:29
 */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import { getContract } from "../../utils/web3Utils";
import abi from "../../constants/contract/contractAbi/Poap";
import { PoapAdddress } from "../../constants/contract/address";
import { useAddPopup } from "../../state/application/hooks";
import { numberToHex, hexToNumber } from "@polkadot/util";
import { stripHexPrefix } from "web3-utils";
import { getPoapId } from "../../services/api";
import { HOSTPREFIX } from "../../constants";
import { ZKID } from "../../constants/guide";

import bg from "../../images/step_install.svg";

const LastStep: React.FC = () => {
  const addPopup = useAddPopup();
  const { account } = useWeb3React();
  const [claimLoading, setClaimLoading] = useState(false);
  const [poapId, setPoapId] = useState();
  const [nftId, setNftId] = useState();

  const jumpToZKID = () => {
    window.open(ZKID);
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
          setClaimLoading(false);
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

  const formatNum = (num) => {
    return hexToNumber(stripHexPrefix(numberToHex(num)).slice(32));
  };

  useEffect(() => {
    const contract = getContract(abi, PoapAdddress);
    contract.events.MintPoap({}, (error, event) => {
      console.log(445555, error, event);
      const { nftId, poapId } = event.returnValues;
      setPoapId(poapId);
      setNftId(nftId);
    });
  }, []);

  const getPoapIdByAccount = async () => {
    const res = await getPoapId({ who: account });

    if (res.data.code === 200 && res.data.data) {
      const { poapId, nftId } = res.data.data;
      setPoapId(poapId);
      setNftId(nftId);
    }
  };

  useEffect(() => {
    getPoapIdByAccount();
  }, [account]);

  return (
    <div className="step-wrapper">
      <div className="title">Claim POAP</div>
      <div className="sub-title">
        Congratulations! Your STARK proof has passed our test. We will generate
        the POAP for you as per your zk-Portrait. Have a great journey!
      </div>
      {poapId ? (
        <div className="poap">
          <div className="poap-title">zkID Poap</div>
          <img
            src={`${HOSTPREFIX}/public/${poapId}.png`}
            alt=""
            className="poap-img"
          />
          <div className="poap-num">No : {formatNum(Number(nftId))}</div>
        </div>
      ) : (
        <img src={bg} alt="" className="install-bg" />
      )}
      {poapId ? (
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
