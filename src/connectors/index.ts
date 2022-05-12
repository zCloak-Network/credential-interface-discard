/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-16 14:08:05
 * @LastEditTime: 2022-04-16 14:54:40
 */
import { InjectedConnector } from "@web3-react/injected-connector";
import { SupportedChainId, ALL_SUPPORTED_CHAIN_IDS } from "../constants/chains";
import { NetworkConnector } from "./NetworkConnector";

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.LOCAL]: "http://192.168.31.156:7545",
  [SupportedChainId.MOONBASEALPHA]: "https://rpc.testnet.moonbeam.network",
};

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1337,
});
