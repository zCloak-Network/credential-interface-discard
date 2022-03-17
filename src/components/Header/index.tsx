/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-03-17 15:33:21
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrIdentity } from "../../state/wallet/hooks";
import { Image } from "@davatar/react";
import classNames from "classnames";
import { useClickAway } from "ahooks";
import Menu from "../Menu";
import Button from "../Button";
import { useToggleConnectWalletModal } from "../../state/application/hooks";
import Logo from "../../images/logo.svg";
import { shortenHash } from "../../utils";
import { Balance, BalanceUtils, BlockchainUtils } from "@kiltprotocol/sdk-js";
import {
  getSigningKeypair,
  getEncryptionKeypair,
  getLightDid,
  getFullDid,
} from "../../utils/accountUtils";

import "./index.scss";
interface Props {
  menu: any;
}

export default function Header({ menu }: Props): React.ReactElement {
  const navigate = useNavigate();
  const ref = useRef();
  const currAccount = useGetCurrIdentity();
  const [menuStatus, setMenuStatus] = useState(true);

  const toggleConnectWalletModal = useToggleConnectWalletModal();

  const handleOpenConnect = async () => {
    toggleConnectWalletModal();
  };

  useClickAway(() => {
    setMenuStatus(false);
  }, ref);

  const handleGoHome = () => {
    navigate("/");
  };

  const openMenu = (e) => {
    e.stopPropagation();
    setMenuStatus(!menuStatus);
  };

  const getMyBalance = async () => {
    console.log(44440000, currAccount.account.address);
    const balance = await Balance.getBalances(currAccount?.account.address);
    console.log(4444, balance);
    return balance.free;
  };
  // const aa = getMyBalance();

  const getData = async () => {
    if (currAccount.account.address) {
      const fullDid = await getFullDid(
        currAccount.account,
        currAccount.oldMnemonic
      );
      console.log(121212000, fullDid);
    }
  };

  useEffect(() => {
    // getMyBalance();
    getData();
  }, [currAccount]);

  return (
    <div className="header-component">
      <img src={Logo} alt="logo" className="logo" onClick={handleGoHome} />
      <div
        className={classNames("header-menu-wrapper", {
          close: !menuStatus,
        })}
        ref={ref}
      >
        <Menu className="header-menu" menu={menu} />
      </div>
      <div className="header-right">
        <div className="btn connected" onClick={handleOpenConnect}>
          {shortenHash(currAccount?.account.address)}
          <div className="acc-img">
            <Image address={currAccount?.account.address} size={16} />
          </div>
        </div>
        <Button className="menu-btn" onClick={openMenu}>
          Menu
        </Button>
      </div>
    </div>
  );
}
