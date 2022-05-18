/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 19:00:35
 * @LastEditTime: 2022-05-13 17:04:24
 */
export enum ExplorerDataType {
  TRANSACTION = "transaction",
  TOKEN = "token",
  ADDRESS = "address",
  BLOCK = "block",
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(
  chainId: number,
  data: string,
  type: ExplorerDataType
): string {
  const prefix = `https://etherscan.io`;

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`;

    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`;

    // case ExplorerDataType.BLOCK:
    //   if (chainId === SupportedChainId.OPTIMISM || chainId === SupportedChainId.OPTIMISTIC_KOVAN) {
    //     return `${prefix}/tx/${data}`
    //   }
    //   return `${prefix}/block/${data}`

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`;
    default:
      return `${prefix}`;
  }
}
