/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-03-25 17:40:59
 */
import React, { ReactElement } from "react";
import Modal from "../../components/Modal";
import { Image } from "@davatar/react";
import { useNavigate } from "react-router-dom";
import { shortenHash } from "../../utils";
import {
  useGetidentities,
  useSaveCurrIdentity,
  useGetCurrIdentity,
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
  const currAccount = useGetCurrIdentity();
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

  const handleDownload = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      title="Choose Account"
      visible={connectWalletModalOpen}
      onCancel={toggleConnectWalletModal}
      wrapClassName="walletModal"
    >
      <ul className="wallets">
        {data?.map((it) => {
          const address = it.account.address;

          return (
            <li
              className="account-item"
              key={address}
              onClick={() => {
                handleClick(it);
              }}
            >
              <div className="left">
                <Image address={address} size={18} />
                <span className="account-addr">{shortenHash(address)}</span>
              </div>
              <div className="right">
                {currAccount.account.address === address && (
                  <i
                    className="iconfont icon_success2"
                    onClick={handleDownload}
                  />
                )}
                <CopyHelper toCopy={address} />
                <i
                  className="iconfont icon_download"
                  onClick={handleDownload}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="footer" onClick={handleCreate}>
        Create A New Account
      </div>
    </Modal>
  );
}
