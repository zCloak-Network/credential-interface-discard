/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2022-01-12 17:20:28
 */
import React from "react";
import Modal from "../Modal";

import { SupportedChainId, CHAIN_INFO } from "../../constants/chains";
import {
  useModalOpen,
  useToggleErrorModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";

import "./index.scss";

export default function ErrorModal(): JSX.Element {
  const toggleErrorModal = useToggleErrorModal();
  const errorModalOpen = useModalOpen(ApplicationModal.ERROR);

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
      } catch (switchError) {
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
      <h2 className="sub-title">Please connect to Mooriver Network.</h2>
      <div onClick={handleSwitch} className="switch-btn">
        Switch to Moonriver Network
      </div>
    </Modal>
  );
}
