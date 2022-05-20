/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-20 17:33:38
 */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import { getContract } from "../../utils/web3Utils";
import abi from "../../constants/contract/contractAbi/Poap";
import { PoapAdddress } from "../../constants/contract/address";
import { useAddPopup } from "../../state/application/hooks";
import { hexToNumber } from "@polkadot/util";
import { stripHexPrefix, numberToHex } from "web3-utils";
import { getPoapId } from "../../services/api";
import { getImg } from "../../utils/poap";
import { ZKID_URL, GUIDE_DESC } from "../../constants/guide";
import BN from "bn.js";
import { SerializableTransactionReceipt } from "../../state/transactions/reducer";
import { PoapDigitalLink } from "../../utils/poap";
import _ from "lodash";

import bg from "../../images/nft_cover.webp";

const LastStep: React.FC = () => {
  const addPopup = useAddPopup();
  const { account } = useWeb3React();
  const [claimLoading, setClaimLoading] = useState<boolean>(false);
  const [poapId, setPoapId] = useState<PoapDigitalLink | null>(null);
  const [nftId, setNftId] = useState<string | null>(null);

  const jumpToZKID = () => {
    window.open(ZKID_URL);
  };

  const claimPoap = () => {
    const contract = getContract(abi, PoapAdddress);
    setClaimLoading(true);
    contract.methods
      .claim()
      .send({
        from: account,
      })
      .then(function (receipt: SerializableTransactionReceipt) {
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

  const formatNum = (num: string) => {
    const numId = hexToNumber(
      stripHexPrefix(numberToHex(new BN(num))).slice(32)
    );

    return _.padStart(String(numId), 6, "0");
  };

  useEffect(() => {
    const contract = getContract(abi, PoapAdddress);
    contract.events.MintPoap({}, (_: never, event: any) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="step-wrapper">
      <div className="title">{GUIDE_DESC.claimPOAP.title}</div>
      <div className="sub-title">{GUIDE_DESC.claimPOAP.desc}</div>
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
        <Button className="btn jump-dashboard-btn" onClick={jumpToZKID}>
          Go to Dashboard
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
