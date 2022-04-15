/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 13:40:15
 * @LastEditTime: 2022-04-15 18:19:50
 */
import React, { useEffect, useState } from "react";
import LogoBanner from "../LogoBanner";
import { Image } from "@davatar/react";
import { shortenAddress } from "../../utils";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import logo from "../../images/logo_white.svg";
import Web3 from "web3";

import "./index.scss";

const GuideHeader: React.FC = () => {
  const { error, account } = useWeb3React();
  const [balance, setBalance] = useState<any>();

  const getData = async () => {
    if (account) {
      const web3 = new Web3(Web3.givenProvider);
      const balance = await web3.eth.getBalance(account);
      const formatBalance = Number(web3.utils.fromWei(balance)).toFixed(4);
      setBalance(formatBalance);
    }
  };

  useEffect(() => {
    getData();
  }, [account]);

  return (
    <div className="guide-header-component">
      <LogoBanner logo={logo} className="guide-header-logo" />
      {account && (
        <div className="account">
          <div className="account-balance">{balance}&nbsp;DEV</div>
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
