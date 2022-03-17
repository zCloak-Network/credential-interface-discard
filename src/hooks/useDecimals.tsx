/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2021-12-13 21:54:34
 */
import React, { useEffect, useContext, useState } from "react";

import MyContext from "../components/Context";
import abi from "../constants/contract/contractAbi/SampleToken";
// import { SampleTokenAdddress } from "../constants/contract/address";

type Props = {
  web3: any;
};

export default function useDecimals(address) {
  const { web3 } = useContext(MyContext) as Props;
  const [symbol, setSymbol] = useState(0);

  const contract = new web3.eth.Contract(abi, address);
  const getData = async () => {
    const symbol = await contract.methods.decimals().call();
    setSymbol(symbol);
  };

  useEffect(() => {
    if (!address) return;
    getData();
  }, [address]);

  return symbol;
}
