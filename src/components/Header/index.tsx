/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-03-29 17:09:23
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
  const [menuStatus, setMenuStatus] = useState(true);
  const [balance, setBalance] = useState("");
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

  const getMyBalanceString = async () => {
    if (currAccount?.account?.address) {
      await setBalanceLoading(true);
      const balance = await Kilt.Balance.getBalances(
        currAccount.account.address
      );

      const balanceString = await Kilt.BalanceUtils.formatKiltBalance(
        balance.free
      );

      await setBalanceLoading(false);

      await setBalance(balanceString);
    }
  };

  // const validate = async () => {
  //   const balance = await getMyBalance();
  //   if (currAccount.fullDid && currAccount.fullDid.did) {
  //     return true;
  //   } else if (balance === "0") {
  //     addPopup({
  //       txn: {
  //         hash: "",
  //         success: false,
  //         title: "Account balance too low",
  //         summary: "Invalid Transaction: Inability to pay some fees.",
  //       },
  //     });
  //   } else {
  //     await handleGenerateFullDid();
  //   }
  // };

  // const handleSwitch = async () => {
  //   if (isClaimer) {
  //     await validate();

  //     await navigate("/attester");
  //   } else {
  //     navigate("/claimer");
  //   }
  // };

  // const switchBtn = (
  //   <span className="switchBtn" onClick={handleSwitch}>
  //     <span
  //       className={classNames({
  //         active: isClaimer,
  //       })}
  //     >
  //       Claimer
  //     </span>
  //     <span
  //       className={classNames({
  //         active: !isClaimer,
  //       })}
  //     >
  //       Attester
  //     </span>
  //   </span>
  // );

  useEffect(() => {
    getMyBalanceString();
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
            ) : balance === "0" ? (
              "0 KILT"
            ) : (
              balance
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
