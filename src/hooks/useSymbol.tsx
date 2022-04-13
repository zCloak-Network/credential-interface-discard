/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2022-04-13 21:17:48
 */
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/web3Utils";
import abi from "../constants/contract/contractAbi/SampleToken";

type Props = {
  web3: any;
};

export default function useSymbol(address) {
  const [symbol, setSymbol] = useState("");

  const getData = async () => {
    const contract = getContract(abi, address);

    const data = await contract.methods.symbol().call();

    await setSymbol(data);
  };

  useEffect(() => {
    if (!address) return;
    getData();
  }, [address]);

  if (!address) return "";

  return symbol;
}
