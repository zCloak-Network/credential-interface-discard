/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-16 19:21:15
 * @LastEditTime: 2022-01-05 14:26:56
 */

// 钱包允许连接的链
export enum SupportedChainId {
  MOONBASEALPHA = 1287,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
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
};
