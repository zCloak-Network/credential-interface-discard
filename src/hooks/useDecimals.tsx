/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2022-04-10 22:14:48
 */
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/web3Utils";
import abi from "../constants/contract/contractAbi/SampleToken";
// import { SampleTokenAdddress } from "../constants/contract/address";

export default function useDecimals(address) {
  const [decimals, setDecimals] = useState(0);

  const getData = async () => {
    const contract = getContract(abi, address);
    const decimals = await contract.methods.decimals().call();
    console.log(7777770000, decimals);
    await setDecimals(decimals);
  };

  console.log(777777, address, decimals);

  useEffect(() => {
    if (!address) return;
    getData();
  }, [address, decimals]);

  return decimals;
}
