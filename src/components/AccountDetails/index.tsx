/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 17:56:31
 * @LastEditTime: 2022-01-11 10:26:11
 */
import React from "react";
import Modal from "../Modal";
import { useActiveWeb3React } from "../../hooks/web3";
import { shortenAddress } from "../../utils";
import { ExternalLink } from "react-feather";
import Copy from "./Copy";
import {
  useModalOpen,
  useToggleConnectWalletModal,
  useToggleAccountDetailsModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";

import "./indes.scss";

export default function AccountDetails(): JSX.Element {
  const { account, chainId } = useActiveWeb3React();
  const toggleConnectWalletModal = useToggleConnectWalletModal();
  const toggleAccountDetailsModal = useToggleAccountDetailsModal();
  const accountDetailsModalOpen = useModalOpen(
    ApplicationModal.ACCOUNT_DETAILS
  );

  const handeleOpenConnect = () => {
    toggleConnectWalletModal();
  };

  return (
    <Modal
      hasDivider
      visible={accountDetailsModalOpen}
      title="Account"
      onCancel={toggleAccountDetailsModal}
      wrapClassName="account-details"
    >
      <div className="account-details-header">
        <h2 className="sub-title">Connect with MetaMask</h2>
        <div className="change-btn" onClick={handeleOpenConnect}>
          Change
        </div>
      </div>
      <span className="account">{account && shortenAddress(account)}</span>
      <div className="account-details-btns">
        <Copy toCopy={account}>
          <span className="copy-btn">Copy Address</span>
        </Copy>
        <a
          target="_blank"
          className="view-btn"
          href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
          rel="noreferrer"
        >
          <ExternalLink size={16} className="icon" />
          View on Explorer
        </a>
      </div>
    </Modal>
  );
}
