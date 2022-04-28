/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-28 17:16:43
 */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import { getContract } from "../../utils/web3Utils";
import abi from "../../constants/contract/contractAbi/Poap";
import { PoapAdddress } from "../../constants/contract/address";
import { useAddPopup } from "../../state/application/hooks";
import { hexToNumber } from "@polkadot/util";
import { stripHexPrefix, numberToHex, padLeft } from "web3-utils";
import { getPoapId } from "../../services/api";
import { getImg } from "../../utils/poap";
import { ZKID, GUIDEDESC } from "../../constants/guide";
import BN from "bn.js";

import bg from "../../images/nft_cover.png";

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
    const numId = hexToNumber(
      stripHexPrefix(numberToHex(new BN(num))).slice(32)
    );

    return stripHexPrefix(padLeft(numId, 6, "0"));
  };

  useEffect(() => {
    const contract = getContract(abi, PoapAdddress);
    contract.events.MintPoap({}, (error, event) => {
      const { nftId, poapId } = event.returnValues;
      setPoapId(poapId);
      setNftId(nftId);
    });
  }, []);

  const getPoapIdByAccount = async () => {
    if (!account) return;
    const res = await getPoapId({ who: account });

    if (res.data.code === 200) {
      if (res.data.data) {
        const { poapId, nftId } = res.data.data;
        setPoapId(poapId);
        setNftId(nftId);
      } else {
        setPoapId(null);
        setNftId(null);
      }
    }
  };

  useEffect(() => {
    getPoapIdByAccount();
  }, [account]);

  return (
    <div className="step-wrapper">
      <div className="title">{GUIDEDESC.claimPOAP.title}</div>
      <div className="sub-title">{GUIDEDESC.claimPOAP.desc}</div>
      {poapId ? (
        <div className="poap">
          <img src={getImg(poapId)} alt="" className="poap-img" />
          <div className="poap-num">
            {nftId ? formatNum(String(nftId)) : "-"}
          </div>
        </div>
      ) : (
        <img src={bg} alt="" className="poap-img" />
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
