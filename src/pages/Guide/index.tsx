/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-05-24 17:08:52
 */
import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Web3 from "web3";
import { ethers } from "ethers";
import { fromWei } from "web3-utils";
import { useWeb3React } from "@web3-react/core";
import GuideHome from "../GuideHome";
import GuideContent from "../GuideContent";
import GuideHeader from "../GuideHeader";
import { getPoapId } from "../../services/api";
import { PoapDigitalLink } from "../../utils/poap";
import { decodeAddress } from "@polkadot/keyring";
import { stringToHex, u8aToHex } from "@polkadot/util";
import { getRequestHash } from "../../utils";
import {
  CTYPE_HASH,
  ZK_PROGRAM,
  ADMIN_ATTESTER_ADDRESS,
} from "../../constants/guide";
import { getProof } from "../../services/api";
import { IProof } from "../GuideContent/index";

export const InitDataContext = createContext<{
  poapId: string;
  nftId: string;
  balance: string;
  proof: IProof | null;
}>({
  poapId: "",
  nftId: "",
  balance: "0",
  proof: null,
});

const Guide: React.FC = () => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useState<string>("0");
  const [poapId, setPoapId] = useState<PoapDigitalLink | "">("");
  const [nftId, setNftId] = useState<string>("");
  const [proof, setProof] = useState<IProof | null>(null);

  useEffect(() => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(Web3.givenProvider);

      provider.on("block", async () => {
        const _balance = await provider.getBalance(account);

        const formatBalance = Number(fromWei(String(_balance))).toFixed(4);

        setBalance(formatBalance);
      });

      return () => {
        provider.removeAllListeners();
      };
    }
  }, [account]);

  const getPoapIdByAccount = async () => {
    if (!account) return;
    const res = await getPoapId({ who: account });

    if (res.data.code === 200) {
      if (res.data.data) {
        const { poapId, nftId } = res.data.data;
        setPoapId(poapId);
        setNftId(nftId);
      } else {
        setPoapId("");
        setNftId("");
      }
    }
  };

  const getProofData = async () => {
    if (!account) return;
    const requestHash = getRequestHash({
      cType: CTYPE_HASH,
      programHash: ZK_PROGRAM.hash,
      fieldNames: ZK_PROGRAM.filed.split(",").map((it) => stringToHex(it)),
      attester: u8aToHex(decodeAddress(ADMIN_ATTESTER_ADDRESS)),
    });

    const res = await getProof({
      dataOwner: account,
      requestHash,
    });

    if (res.data.code === 200) {
      const data = res.data.data;

      setProof(data);
    }
  };

  useEffect(() => {
    getProofData();
    getPoapIdByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div style={{ height: "100%" }}>
      <InitDataContext.Provider
        value={{
          poapId,
          nftId,
          balance,
          proof,
        }}
      >
        <GuideHeader balance={balance} />
        <Routes>
          <Route path="/" element={<GuideHome />} />
          <Route path="/tutorial/new" element={<GuideContent />} />
        </Routes>
      </InitDataContext.Provider>
    </div>
  );
};
export default Guide;
