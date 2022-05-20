/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2022-05-19 18:58:06
 */
import React from "react";
import Modal from "../Modal";

import { SupportedChainId, CHAIN_INFO } from "../../constants/chains";
import {
  useModalOpen,
  useToggleWrongNetworkModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";

import "./index.scss";

export default function ErrorNetworkModal(): JSX.Element {
  const toggleErrorModal = useToggleWrongNetworkModal();
  const errorModalOpen = useModalOpen(ApplicationModal.WRONG_NETWORK);

  const handleSwitch = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            { chainId: CHAIN_INFO[SupportedChainId.MOONBASEALPHA].chainId },
          ],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  ...CHAIN_INFO[SupportedChainId.MOONBASEALPHA],
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
      }

      await toggleErrorModal();
    }
  };

  return (
    <Modal
      hasDivider
      visible={errorModalOpen}
      title="Wrong Network"
      onCancel={toggleErrorModal}
      wrapClassName="error-modal"
    >
      <h2 className="sub-title">Please connect to Moonbase Alpha Network.</h2>
      <div onClick={handleSwitch} className="switch-btn">
        Switch to Moonbase Alpha Network
      </div>
    </Modal>
  );
}
