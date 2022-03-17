/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-03-17 19:07:29
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetCurrIdentity,
  useUpdateIdentity,
  useSaveCurrIdentity,
} from "../../state/wallet/hooks";
import { Image } from "@davatar/react";
import classNames from "classnames";
import { useClickAway } from "ahooks";
import Menu from "../Menu";
import Button from "../Button";
import { useToggleConnectWalletModal } from "../../state/application/hooks";
import Logo from "../../images/logo.svg";
import { shortenHash } from "../../utils";
import { Balance } from "@kiltprotocol/sdk-js";
import { getFullDid, generateKeypairs } from "../../utils/accountUtils";

import "./index.scss";
interface Props {
  menu: any;
}

export default function Header({ menu }: Props): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  const currAccount = useGetCurrIdentity();
  const saveCurrIdentity = useSaveCurrIdentity();
  const updateIdentity = useUpdateIdentity();
  const [menuStatus, setMenuStatus] = useState(true);

  const isClaimer = location.pathname.includes("user");

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

  // const getMyBalance = async () => {
  //   console.log(44440000, currAccount.account.address);
  //   const balance = await Balance.getBalances(currAccount?.account);
  //   console.log(4444, balance);
  //   return balance.free;
  // };

  const generateFullDid = async () => {
    const keys = await generateKeypairs(currAccount.oldMnemonic);
    if (currAccount.account.address) {
      const fullDid = await getFullDid(currAccount.account, keys);
      return fullDid;
    }
  };

  const validate = async () => {
    if (currAccount.fullDid && currAccount.fullDid.did) {
      return true;
    } else {
      const fullDid = await generateFullDid();
      const newAccount = { ...currAccount, fullDid: fullDid };
      await updateIdentity(newAccount);
      await saveCurrIdentity(newAccount);
    }
  };

  const handleSwitch = () => {
    if (isClaimer) {
      validate();

      navigate("/attester");
    } else {
      navigate("/user");
    }
  };

  const switchBtn = (
    <span className="switchBtn" onClick={handleSwitch}>
      <span
        className={classNames({
          active: isClaimer,
        })}
      >
        Claimer
      </span>
      <span
        className={classNames({
          active: !isClaimer,
        })}
      >
        Attester
      </span>
    </span>
  );

  // useEffect(() => {
  //   // getMyBalance();
  //   // getData();
  // }, [currAccount]);

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
      {switchBtn}
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
