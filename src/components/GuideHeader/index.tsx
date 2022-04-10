/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 13:40:15
 * @LastEditTime: 2022-04-10 22:20:05
 */
import React, { useEffect, useState } from "react";
import LogoBanner from "../LogoBanner";
import { Image } from "@davatar/react";
import { shortenAddress } from "../../utils";
import useBalance from "../../hooks/useBalance";
// import useSymbol from "../../hooks/useSymbol";
import { getSymbol } from "../../utils/web3Utils";
import abi from "../../constants/contract/contractAbi/SampleToken";
import { TokenAddress } from "../../constants/contract/address";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import logo from "../../images/logo_white.svg";

import "./index.scss";

const GuideHeader: React.FC = () => {
  const { error, account } = useWeb3React();
  // let symbol;
  // const [symbol, setSymbol] = useState("");
  const balance = useBalance(account, TokenAddress);

  // console.log(44444, balance, symbol);

  // const getData = async () => {
  //   const aa = await getSymbol(abi, TokenAddress);
  //   console.log(12233, symbol);
  //   setSymbol(aa);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="guide-header-component">
      <LogoBanner logo={logo} className="guide-header-logo" />
      {account && (
        <div className="account">
          <div className="account-balance">
            {balance}
            {/* {symbol} */}
          </div>
          <div className="account-address">
            {shortenAddress(account)}
            <div className="acc-img">
              <Image address={account} size={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default GuideHeader;
