/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-16 19:21:15
 * @LastEditTime: 2022-04-16 14:53:15
 */

// 钱包允许连接的链
export enum SupportedChainId {
  LOCAL = 1337,
  MOONBASEALPHA = 1287,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.LOCAL,
  SupportedChainId.MOONBASEALPHA,
];

export const CHAIN_INFO = {
  [SupportedChainId.MOONBASEALPHA]: {
    chainId: "0x507",
    chainName: "Moonbase Alpha",
    nativeCurrency: { name: "DEV", symbol: "DEV", decimals: 18 },
    rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
    blockExplorerUrls: ["https://moonbase.moonscan.io/"],
  },
  [SupportedChainId.LOCAL]: {
    chainId: "0x1337",
    chainName: "suvi",
    nativeCurrency: { name: "su", symbol: "su", decimals: 18 },
    rpcUrls: ["http://192.168.31.156:7545"],
    blockExplorerUrls: ["https://moonbase.moonscan.io/"],
  },
};
