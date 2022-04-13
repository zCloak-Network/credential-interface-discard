/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2022-04-13 21:19:17
 */
import React, { useEffect, useState } from "react";
// import useDecimals from "./useDecimals";
import { getContract } from "../utils/web3Utils";
import abi from "../constants/contract/contractAbi/SampleToken";
// import { SampleTokenAdddress } from "../constants/contract/address";

export default function useBalance(account, address) {
  // const decimals = useDecimals(address);
  const [balance, setBalance] = useState(0);

  const getData = async () => {
    const contract = getContract(abi, address);
    const tokenBalance = await contract.methods.balanceOf(account).call();
    const decimals = await contract.methods.decimals().call();

    setBalance(tokenBalance / Math.pow(10, Number(decimals)));
  };

  useEffect(() => {
    if (!address || !account) return;
    getData();
  }, [account, address]);

  return balance;
}
