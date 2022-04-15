/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-06 16:32:12
 * @LastEditTime: 2022-04-15 18:30:33
 */
import React from "react";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { ProofStatus } from "../types/index";
import BN from "bn.js";

const { STATUSTRUE, STATUSFALSE, STATUSING } = ProofStatus;

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function shortenHash(string: string, chars = 8): string {
  if (string) {
    return `${string.substring(0, chars + 2)}...${string.substring(
      string.length - chars
    )}`;
  }

  return "";
}

export function getStatus(
  ifFinishVerify: boolean,
  verifyResult: boolean
): string {
  if (ifFinishVerify && verifyResult) {
    return STATUSTRUE;
  } else if (ifFinishVerify && !verifyResult) {
    return STATUSFALSE;
  }

  return STATUSING;
}

export function getRandom(min = 1, max = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getAge(year, month, date) {
  let age;
  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();
  if (nowYear == year) {
    age = 0; //同年 则为0岁
  } else {
    const ageDiff = nowYear - year; //年之差
    if (ageDiff > 0) {
      if (nowMonth == month) {
        const dayDiff = nowDay - date; //日之差
        if (dayDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      } else {
        const monthDiff = nowMonth - month; //月之差
        if (monthDiff < 0) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      }
    } else {
      age = -1;
    }

    return age;
  }
}

export const hexToInt10 = (hexData: string): string => {
  return new BN(hexData, 16).toString(10);
};
