/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 16:28:19
 * @LastEditTime: 2022-03-16 15:37:49
 */
import { ApiPromise } from "@polkadot/api";
import type { InjectedExtension } from "@polkadot/extension-inject/types";
import type { SubmittableExtrinsicFunction } from "@polkadot/api/promise/types";

export interface InjectedAccountExt {
  name?: string;
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}

export interface ApiProps extends ApiState {
  api: ApiPromise; // 具体的api对象
  apiError: any; // 错误信息
  isApiConnected: boolean; // 是否已经连接至链
  isApiInitialized: boolean; // 是否已经初始化完成, 初始化完成是指获取所需要的链上数据
  isWaitingInjected: boolean; // 是否等待数据注入
  injectedAccounts?: InjectedAccountExt[];
  connect?: () => void;
  currentAccount?: any;
  setActiveAccount?: (account) => void;
  accounts?: InjectedAccountExt[];
  extensions?: InjectedExtension[] | undefined;
}

/*
 * 通过api获取的一些信息, 存储为状态信息
 */
export interface ApiState {
  injectedAccounts?: InjectedAccountExt[];
  apiDefaultTx: SubmittableExtrinsicFunction;
  apiDefaultTxSudo: SubmittableExtrinsicFunction;
  hasInjectedAccounts: boolean;
  isApiReady: boolean;
  isDevelopment: boolean;
  isEthereum: boolean;
  specName: string;
  specVersion: string;
  systemChain: string;
  systemName: string;
  systemVersion: string;
}
