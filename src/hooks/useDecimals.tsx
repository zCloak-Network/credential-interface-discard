/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2022-04-13 21:18:41
 */
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/web3Utils";
import abi from "../constants/contract/contractAbi/SampleToken";

export default function useDecimals(address) {
  const [decimals, setDecimals] = useState(0);

  const getData = async () => {
    const contract = getContract(abi, address);
    const decimals = await contract.methods.decimals().call();
    await setDecimals(decimals);
  };

  useEffect(() => {
    if (!address) return;
    getData();
  }, [address, decimals]);

  return decimals;
}
