/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-12 15:23:11
 * @LastEditTime: 2022-03-16 15:37:31
 */

export interface TokenProps {
  tokenImageUrl?: string;
  tokenName: string;
  tokenAddress: string;
}

export enum ProofStatus {
  STATUSTRUE = "Verified True",
  STATUSFALSE = "Verified False",
  STATUSING = "Verifing",
  STATUSNULL = "",
}
