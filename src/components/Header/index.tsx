/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-04-02 17:30:03
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrIdentity,
  useGetCurrIdentityBalance,
  useSaveCurrIdentityBalance,
} from "../../state/wallet/hooks";
import { Image } from "@davatar/react";
import classNames from "classnames";
import { useClickAway } from "ahooks";
import Menu from "../Menu";
import Button from "../Button";
import { useToggleConnectWalletModal } from "../../state/application/hooks";
import Logo from "../../images/logo.svg";
import { shortenHash } from "../../utils";
import * as Kilt from "@kiltprotocol/sdk-js";
import Loading from "../../images/loading.gif";

import "./index.scss";
interface Props {
  menu: any;
}

export default function Header({ menu }: Props): React.ReactElement {
  const navigate = useNavigate();
  const ref = useRef();
  const currAccount = useGetCurrIdentity();
  const saveCurrIdentityBalance = useSaveCurrIdentityBalance();
  const balance = useGetCurrIdentityBalance();
  const [menuStatus, setMenuStatus] = useState(true);
  const [balanceLoading, setBalanceLoading] = useState(false);

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

  const connectBalance = () => {
    setBalanceLoading(true);
    Kilt.Balance.listenToBalanceChanges(
      currAccount.account.address,
      (account, balance, change) => {
        saveCurrIdentityBalance(balance.free);
        setBalanceLoading(false);
      }
    );
  };

  useEffect(() => {
    if (currAccount?.account?.address) {
      connectBalance();
    }
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
          <span className="balance">
            {balanceLoading ? (
              <img src={Loading} style={{ width: 20 }} />
            ) : balance?.isZero() ? (
              "0 KILT"
            ) : (
              Kilt.BalanceUtils.formatKiltBalance(balance)
            )}
          </span>
          <span className="address">
            {shortenHash(currAccount?.account.address)}
            <div className="acc-img">
              <Image address={currAccount?.account.address} size={16} />
            </div>
          </span>
        </div>
        <Button className="menu-btn" onClick={openMenu}>
          Menu
        </Button>
      </div>
    </div>
  );
}
