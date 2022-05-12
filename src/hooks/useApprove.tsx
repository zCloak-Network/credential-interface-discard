/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 15:08:36
 * @LastEditTime: 2021-12-11 19:22:37
 */
import React, { useContext, useState, useEffect } from "react";

import MyContext from "../components/Context";
import abi from "../constants/contract/contractAbi/SampleToken";
import {
  SampleTokenAdddress,
  RegulatedTransferAdddress,
} from "../constants/contract/address";

type Props = {
  web3: any;
};

export default function useApprove(account) {
  const { web3 } = useContext(MyContext) as Props;
  const [status, setStatus] = useState(false);

  const contract = new web3.eth.Contract(abi, SampleTokenAdddress);

  const getData = async () => {
    if (account) {
      const statusData = await contract.methods
        .allowance(account, RegulatedTransferAdddress)
        .call();

      setStatus(Boolean(Number(statusData)));
    }
  };

  useEffect(() => {
    getData();
  }, [account]);

  return status;
}
