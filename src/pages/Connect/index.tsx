/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-03-17 15:30:10
 */
import React, { ReactElement } from "react";
import Modal from "../../components/Modal";
import { Image } from "@davatar/react";
import { shortenHash } from "../../utils";
import {
  useGetidentities,
  useGetCurrIdentity,
  useSaveCurrIdentity,
} from "../../state/wallet/hooks";
import {
  useModalOpen,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";

import "./index.scss";

export default function Connect(): ReactElement {
  const location = useLocation();
  const data = useGetidentities();
  const curr = useGetCurrIdentity();
  const saveCurrIdentity = useSaveCurrIdentity();
  const navigate = useNavigate();
  const connectWalletModalOpen = useModalOpen(ApplicationModal.CONNECT_WALLET);
  const toggleConnectWalletModal = useToggleConnectWalletModal();

  const handleClick = (value) => {
    saveCurrIdentity(value);
  };

  const isClaimer = location.pathname.includes("user");

  const switchBtn = (
    <span className="switchBtn">
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
    <Modal
      title="Choose Account"
      visible={connectWalletModalOpen}
      onCancel={toggleConnectWalletModal}
      wrapClassName="walletModal"
    >
      <ul className="wallets">
        {data?.map((it) => (
          <li
            className="account-item"
            key={it.account.address}
            onClick={() => {
              handleClick(it);
            }}
          >
            <div className="left">
              <Image address={it.account.address} size={18} />
              <span className="account-addr">
                {shortenHash(it.account.address)}
              </span>
            </div>
            <div className="right">
              {curr.address === it.account.address && switchBtn}
              <i className="iconfont icon_download"></i>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
