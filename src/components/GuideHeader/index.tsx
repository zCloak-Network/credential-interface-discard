/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 13:40:15
 * @LastEditTime: 2022-05-13 13:52:27
 */
import React from "react";
import LogoBanner from "../LogoBanner";
import { Image } from "@davatar/react";
import { shortenAddress } from "../../utils";
import { useWeb3React } from "@web3-react/core";
import logo from "../../images/logo_white.svg";

import "./index.scss";

interface IProps {
  balance?: string;
}

const GuideHeader: React.FC<IProps> = ({ balance }) => {
  const { account } = useWeb3React();

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
