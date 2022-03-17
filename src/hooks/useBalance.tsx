/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2021-12-13 21:54:09
 */
import React, { useEffect, useContext, useState } from "react";
import useDecimals from "./useDecimals";

import MyContext from "../components/Context";
import abi from "../constants/contract/contractAbi/SampleToken";
// import { SampleTokenAdddress } from "../constants/contract/address";
type Props = {
  web3: any;
};

export default function useBalance(account, address) {
  const { web3 } = useContext(MyContext) as Props;
  const decimals = useDecimals(address);
  const [balance, setBalance] = useState(0);

  const contract = new web3.eth.Contract(abi, address);
  const getData = async () => {
    const tokenBalance = await contract.methods.balanceOf(account).call();

    setBalance(tokenBalance / Math.pow(10, Number(decimals)));
  };

  useEffect(() => {
    if (!address) return;
    getData();
  }, [account, decimals, address]);

  return balance;
}
