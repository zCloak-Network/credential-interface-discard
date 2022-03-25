/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-03-25 17:04:31
 */
import React, { ReactElement } from "react";
import Modal from "../../components/Modal";
import { Image } from "@davatar/react";
import { useNavigate } from "react-router-dom";
import { shortenHash } from "../../utils";
import {
  useGetidentities,
  useSaveCurrIdentity,
} from "../../state/wallet/hooks";
import {
  useModalOpen,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";
import CopyHelper from "../../components/Copy";
import { ApplicationModal } from "../../state/application/reducer";

import "./index.scss";

export default function Connect(): ReactElement {
  const navigate = useNavigate();
  const data = useGetidentities();
  const saveCurrIdentity = useSaveCurrIdentity();
  const connectWalletModalOpen = useModalOpen(ApplicationModal.CONNECT_WALLET);
  const toggleConnectWalletModal = useToggleConnectWalletModal();

  const handleClick = (value) => {
    saveCurrIdentity(value);
    toggleConnectWalletModal();
  };

  const handleCreate = () => {
    navigate("/register-again");
    toggleConnectWalletModal();
  };

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
              <CopyHelper toCopy={it.account.address}>
                {/* <span className="copy-btn">Copy Address</span> */}
              </CopyHelper>
              <i className="iconfont icon_download"></i>
            </div>
          </li>
        ))}
      </ul>
      <div className="footer" onClick={handleCreate}>
        Create A New Account
      </div>
    </Modal>
  );
}
