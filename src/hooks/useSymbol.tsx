/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2022-04-13 12:01:59
 */
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/web3Utils";
import Web3 from "web3";
import abi from "../constants/contract/contractAbi/SampleToken";
import { AbiItem } from "web3-utils/types";
// import { SampleTokenAdddress } from "../constants/contract/address";

type Props = {
  web3: any;
};

export default function useSymbol(address) {
  const [symbol, setSymbol] = useState("");
  // const web3 = new Web3(Web3.givenProvider);
  // const contract = new web3.eth.Contract(
  //   abi as AbiItem[],
  //   "0xE29e1CFDC236119194D7a6AbFFC8b0F6d2aDd6e5"
  // );
  console.log(56663333, abi, address);

  const getData = async () => {
    const contract = getContract(abi, address);

    const data = await contract.methods.symbol().call();
    console.log(56666000000, data);
    await setSymbol(data);
  };

  useEffect(() => {
    console.log(5659999, address);
    if (!address) return;
    console.log(56666000000, address);
    getData();
  }, [address]);

  if (!address) return "";
  console.log(565655599995, address, symbol);
  return symbol;
}
