/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-28 16:12:03
 */
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { shortenAddress } from "../../utils";
import { SupportedChainId, CHAIN_INFO } from "../../constants/chains";
import classNames from "classnames";
import { message } from "antd";
import { openMessage, destroyMessage } from "../../utils/message";
import { METAMASKEXTENSION } from "../../constants/guide";
import { getToken, getTokenStatus } from "../../services/api";
import { useInterval } from "ahooks";
import { GUIDEDESC } from "../../constants/guide";

type Props = {
  handleNext: () => void;
  balance: string;
};
const TIME = 3000;

enum FAUCETSTATUS {
  notFauceted = 1,
  fauceting = 2,
  fauceted = 3,
}
const messageKey = "installMetamask";

const FourthStep: React.FC<Props> = ({ balance, handleNext }) => {
  const [status, setStatus] = useState<string>("connect");
  const { account, error, activate } = useWeb3React();
  const [interval, setInterval] = useState(undefined);
  const [faucetStatus, setfaucetStatus] = useState(1);

  const handleConnect = async (connector: AbstractConnector | undefined) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
        }
      });
  };

  const handleInstall = () => {
    window.open(METAMASKEXTENSION);
  };

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
    }
  };

  const queryTokenStatus = async () => {
    const res = await getTokenStatus({ address: account });
    if (res.data.code === 200) {
      setfaucetStatus(res.data.data.status);
    }
  };

  const updateStatus = async () => {
    if (faucetStatus === FAUCETSTATUS.fauceting) {
      queryTokenStatus();
    } else {
      await setInterval(undefined);
      await setStatus("connected");
    }
  };

  useInterval(() => {
    if (account) {
      updateStatus();
    }
  }, interval);

  const handleToken = async () => {
    if (account) {
      await setStatus("loading");
      const res = await getToken({ address: account });
      if (res.data.code === 200) {
        // await setStatus("loading");
        await queryTokenStatus();
        await setInterval(TIME);
      }
    }
  };

  const STATUS = {
    install: {
      buttonText: "Install MetaMask",
      buttonType: null,
      func: handleInstall,
      message: "You don’t have MetaMask installed",
      messageType: "error",
    },
    connect: {
      buttonText: "connect wallet",
      buttonType: null,
      func: handleConnect,
      message: null,
      messageType: null,
    },
    loading: {
      buttonText: "loading",
      buttonType: "loading",
      func: null,
      message: "Please sign the message in your wallet",
      messageType: "warning",
    },
    switch: {
      buttonText: "Switch network",
      buttonType: null,
      func: handleSwitch,
      message: "You are on the wrong network",
      messageType: "error",
    },
    connected: {
      buttonText: "Next",
      buttonType: null,
      func: handleNext,
      message: null,
      messageType: null,
    },
    balance: {
      buttonText: "Get token",
      buttonType: null,
      func: handleToken,
      message: null,
      messageType: null,
    },
  };
  const allStatus = STATUS[status];

  useEffect(() => {
    setfaucetStatus(1);
  }, [account]);

  useEffect(() => {
    if (!(window.web3 || window.ethereum)) {
      setStatus("install");
      const data = STATUS.install;
      message[data.messageType]({
        content: data.message,
        duration: 0,
        key: messageKey,
      });
      return;
    }

    if (error && error instanceof UnsupportedChainIdError) {
      setStatus("switch");
      const data = STATUS.switch;
      openMessage(data.message, data.messageType, messageKey);
      return;
    }
    if (!account) {
      setStatus("connect");
      return;
    }

    if (balance === "0.0000") {
      setStatus("balance");
      return;
    }

    setStatus("connected");
    destroyMessage(messageKey);
  }, [error, account, balance]);

  return (
    <div className="step-wrapper">
      <div className="title">{GUIDEDESC.connectMetamask.title}</div>
      <div className="sub-title">{GUIDEDESC.connectMetamask.desc}</div>
      <ul
        className={classNames("wallets", {
          "has-account": account,
        })}
      >
        {Object.keys(SUPPORTED_WALLETS).map((key) => {
          const option = SUPPORTED_WALLETS[key];
          return (
            <li className="wallet-item" key={key}>
              <img src={option.iconURL} className="wallet-img" />
              <span className="wallet-name">{option.name}</span>
            </li>
          );
        })}
      </ul>
      {account && (
        <div className="connect-tip">
          {shortenAddress(account)} is connected.
        </div>
      )}
      <Button
        size="default"
        loading={status === "loading"}
        className="btn connect-btn"
        onClick={() => {
          allStatus.func(SUPPORTED_WALLETS.METAMASK.connector);
        }}
      >
        {allStatus.buttonText}
      </Button>
    </div>
  );
};
export default FourthStep;
