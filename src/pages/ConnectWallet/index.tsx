/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-05-19 19:13:34
 */
import { useEffect, ReactElement } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleWrongNetworkModal,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import { WalletInfo } from "../../constants/wallet";

import "./index.scss";

export default function Connect(): ReactElement {
  const { connector, activate, error } = useWeb3React();
  const connectWalletModalOpen = useModalOpen(ApplicationModal.CONNECT_WALLET);
  const toggleConnectWalletModal = useToggleConnectWalletModal();
  const toggleErrorModal = useToggleWrongNetworkModal();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(
        SUPPORTED_WALLETS.METAMASK.connector as AbstractConnector,
        undefined,
        true
      )
        .then(async () => {
          toggleConnectWalletModal();
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          }
        });
  };

  const handleSelect = (option: WalletInfo) => {
    option.connector === connector
      ? toggleConnectWalletModal()
      : !option.href && tryActivation(option.connector);
  };

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      toggleErrorModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Modal
      title="Connect to a wallet"
      visible={connectWalletModalOpen}
      onCancel={toggleConnectWalletModal}
      wrapClassName="walletModal"
    >
      <ul className="wallets">
        {Object.keys(SUPPORTED_WALLETS).map((key) => {
          const option = SUPPORTED_WALLETS[key];
          return (
            <li
              key={key}
              onClick={() => {
                handleSelect(option);
              }}
            >
              <img
                src={option.iconURL}
                className="wallet-img"
                alt={option.name}
              />
              <span className="wallet-name">{option.name}</span>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
