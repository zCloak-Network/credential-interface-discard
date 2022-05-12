/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-16 15:47:06
 * @LastEditTime: 2022-01-05 14:43:06
 */
import { AbstractConnector } from "@web3-react/abstract-connector";

import METAMASK_ICON_URL from "../images/logo_metamask.svg";
import { injected } from "../connectors";

interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  // INJECTED: {
  //   connector: injected,
  //   name: 'Injected',
  //   iconURL: INJECTED_ICON_URL,
  //   description: 'Injected web3 provider.',
  //   href: null,
  //   color: '#010101',
  //   primary: true,
  // },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconURL: METAMASK_ICON_URL,
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
};
