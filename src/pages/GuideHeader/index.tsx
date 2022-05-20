/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 13:40:15
 * @LastEditTime: 2022-05-20 17:40:57
 */
import { Image } from "@davatar/react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Menu, Dropdown } from "antd";
import LogoBanner from "../../components/LogoBanner";
import { shortenAddress } from "../../utils";
import {
  useToggleWrongNetworkModal,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";
import {
  ZCLOAK_URL,
  ZCLOAK_TWITTER_URL,
  ZCLOAK_DISCORD_URL,
} from "../../constants/guide";
import { CHAIN_INFO, SupportedChainId } from "../../constants/chains";

import logo from "../../images/logo_white.svg";

import "./index.scss";

interface IProps {
  balance?: string;
}

const GuideHeader: React.FC<IProps> = ({ balance }) => {
  const { error, account, chainId } = useWeb3React();
  const toggleErrorModal = useToggleWrongNetworkModal();
  const toggleConnectWalletModal = useToggleConnectWalletModal();

  // TODO
  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case "1":
        window.open(ZCLOAK_URL);
        break;
      case "2":
        window.open(ZCLOAK_DISCORD_URL);
        break;
      case "3":
        window.open(ZCLOAK_TWITTER_URL);
        break;

      default:
        break;
    }
  };

  let inner;

  if (error) {
    inner = (
      <div className="btn-error" onClick={toggleErrorModal}>
        {error instanceof UnsupportedChainIdError
          ? "You are on the wrong network"
          : "Error"}
      </div>
    );
  } else if (account) {
    inner = (
      <div className="account">
        <div className="account-balance">{balance}&nbsp;DEV</div>
        <div className="account-address">
          {shortenAddress(account)}
          <div className="acc-img">
            <Image address={account} size={16} />
          </div>
        </div>
      </div>
    );
  } else {
    inner = (
      <div className="btn-connected" onClick={toggleConnectWalletModal}>
        Connect wallet
      </div>
    );
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "About",
          key: "1",
        },
        {
          label: "Discord",
          key: "2",
        },
        {
          label: "Twitter",
          key: "3",
        },
      ]}
    />
  );

  return (
    <div className="guide-header">
      <LogoBanner logo={logo} className="guide-header-logo" />
      <div className="guide-header-right">
        {chainId && (
          <div className="btn-chain">
            {CHAIN_INFO[chainId as SupportedChainId].chainName}
          </div>
        )}
        {inner}
        <Dropdown overlay={menu} overlayClassName="guide-header-menu-overlay">
          <div className="btn-more">
            <i className="iconfont icon_more_vertical"></i>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
export default GuideHeader;
