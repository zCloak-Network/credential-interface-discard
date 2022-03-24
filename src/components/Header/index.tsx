/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-03-24 14:06:54
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
import * as Kilt from "@kiltprotocol/sdk-js";
import { useAddPopup } from "../../state/application/hooks";
import {
  generateAccount,
  generateFullDid,
  generateFullKeypairs,
} from "../../utils/accountUtils";

import "./index.scss";
interface Props {
  menu: any;
}

export default function Header({ menu }: Props): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  const addPopup = useAddPopup();
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

  const getMyBalance = async () => {
    const balance = await Kilt.Balance.getBalances(currAccount.account.address);

    // const aa = await Kilt.BalanceUtils.formatKiltBalance(balance.free);

    return balance.free.toString();
  };

  const handleGenerateFullDid = async () => {
    if (currAccount.account.address) {
      const keystore = new Kilt.Did.DemoKeystore();

      const keys = await generateFullKeypairs(keystore, currAccount.mnemonic);
      const account = await generateAccount(currAccount.mnemonic);

      try {
        const fullDid = await generateFullDid(keystore, account, keys);
        const newAccount = { ...currAccount, fullDid: fullDid };
        await updateIdentity(newAccount);
        await saveCurrIdentity(newAccount);
        await addPopup({
          txn: {
            hash: "",
            success: true,
            title: "SUCCESS",
            summary: `Fulldid successfully created.`,
          },
        });
      } catch (error) {
        throw error;
      }
    }
  };

  const validate = async () => {
    const balance = await getMyBalance();
    if (currAccount.fullDid && currAccount.fullDid.did) {
      return true;
    } else if (balance === "0") {
      addPopup({
        txn: {
          hash: "",
          success: false,
          title: "Account balance too low",
          summary: "Invalid Transaction: Inability to pay some fees.",
        },
      });
    } else {
      await handleGenerateFullDid();
    }
  };

  const handleSwitch = async () => {
    if (isClaimer) {
      await validate();

      await navigate("/attester");
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
