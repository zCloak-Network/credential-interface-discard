import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import type { InjectedExtension } from "@polkadot/extension-inject/types";
import type BN from "bn.js";
import React, { useEffect, useMemo, useState } from "react";
// import Loading from "../loading";
// import types from "../../types.json";
import { decodeUrlTypes } from "../components/Api/urlTypes";
import store from "store";
import registry from "../components/Api/typeRegistry";
import { keyring } from "@polkadot/ui-keyring";
import { settings } from "@polkadot/ui-settings";
import { deriveMapCache, setDeriveCache } from "@polkadot/api-derive/util";
import type { KeyringStore } from "@polkadot/ui-keyring/types";
import type { ChainProperties, ChainType } from "@polkadot/types/interfaces";
import { ApiProvider } from "../components/Api/apiContext";
import { ApiProps, ApiState } from "../components/Api/types";
import { formatBalance, isTestChain } from "@polkadot/util";
import { ethereumChains } from "../components/Api/ethereumChains";
import { TokenUnit } from "../components/Api/tokenUnit";
import { defaults as addressDefaults } from "@polkadot/util-crypto/address/defaults";
// import loading from "../../images/loading.gif";

// import "./Api.scss";

// export interface ApiState {
//   apiDefaultTx: SubmittableExtrinsicFunction;
//   apiDefaultTxSudo: SubmittableExtrinsicFunction;
//   hasInjectedAccounts: boolean;
//   isApiReady: boolean;
//   isDevelopment: boolean;
//   isEthereum: boolean;
//   systemChain: string;
//   systemName: string;
//   systemVersion: string;
// }

// export interface ApiProps {
//   api: ApiPromise;
//   apiError: string | null;
//   extensions?: InjectedExtension[];
//   isApiConnected: boolean;
//   isApiInitialized: boolean;
//   isWaitingInjected: boolean;
// }

// 传入的数据定义
interface Props {
  children: React.ReactNode; // 暂时理解为传入的组件
  url?: string; // 要连接的链的url信息
  store?: KeyringStore;
}

// 注入的外部account定义(例, 来自extension)
interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}
// 链信息
interface ChainData {
  injectedAccounts: InjectedAccountExt[]; // 获取extension的account
  properties: ChainProperties; // 链属性 定义来自 @polkadot/types/interfaces
  systemChain: string; //
  systemChainType: any;
  systemName: string;
  systemVersion: string;
}

export const DEFAULT_DECIMALS = registry.createType("u32", 12);
export const DEFAULT_SS58 = registry.createType("u32", addressDefaults.prefix);
export const DEFAULT_AUX = [
  "Aux1",
  "Aux2",
  "Aux3",
  "Aux4",
  "Aux5",
  "Aux6",
  "Aux7",
  "Aux8",
  "Aux9",
];

let api: ApiPromise;

export { api };

function isKeyringLoaded() {
  try {
    return !!keyring.keyring;
  } catch {
    return false;
  }
}

function getDevTypes(): Record<string, Record<string, string>> {
  const types =
    decodeUrlTypes() ||
    (store.get("types", {}) as Record<string, Record<string, string>>);
  const names = Object.keys(types);

  console.log(44555, types);

  names.length && console.log("Injected types:", names.join(", "));

  return types;
}

async function getInjectedAccounts(
  injectedPromise: Promise<InjectedExtension[]>
): Promise<InjectedAccountExt[]> {
  try {
    await injectedPromise;
    const accounts = await web3Accounts();
    return accounts.map(
      ({ address, meta }, whenCreated): InjectedAccountExt => ({
        address,
        meta: {
          ...meta,
          name: `${meta.name || "unknown"} (${
            meta.source === "polkadot-js" ? "extension" : meta.source
          })`,
          whenCreated,
        },
      })
    );
  } catch (error) {
    console.error("web3Enable", error);
    return [];
  }
}

async function loadOnReady(
  api: ApiPromise,
  injectedPromise: Promise<InjectedExtension[]>,
  store: KeyringStore | undefined,
  types: Record<string, Record<string, string>>
): Promise<ApiState> {
  registry.register(types);
  const {
    injectedAccounts,
    properties,
    systemChain,
    systemChainType,
    systemName,
    systemVersion,
  } = await retrieve(api, injectedPromise);
  const ss58Format =
    settings.prefix === -1
      ? properties.ss58Format.unwrapOr(DEFAULT_SS58).toNumber()
      : settings.prefix;
  const tokenSymbol = properties.tokenSymbol.unwrapOr([
    formatBalance.getDefaults().unit,
    ...DEFAULT_AUX,
  ]);
  const tokenDecimals = properties.tokenDecimals.unwrapOr([DEFAULT_DECIMALS]);
  const isEthereum = ethereumChains.includes(
    api.runtimeVersion.specName.toString()
  );
  const isDevelopment =
    systemChainType.isDevelopment ||
    systemChainType.isLocal ||
    isTestChain(systemChain);

  console.log(
    `chain: ${systemChain} (${systemChainType.toString()}), ${JSON.stringify(
      properties
    )}`
  );

  // explicitly override the ss58Format as specified
  registry.setChainProperties(
    registry.createType("ChainProperties", {
      ss58Format,
      tokenDecimals,
      tokenSymbol,
    })
  );

  // first setup the UI helpers
  formatBalance.setDefaults({
    decimals: (tokenDecimals as BN[]).map((b) => b.toNumber()),
    unit: tokenSymbol[0].toString(),
  });
  TokenUnit.setAbbr(tokenSymbol[0].toString());

  // finally load the keyring
  isKeyringLoaded() ||
    keyring.loadAll(
      {
        genesisHash: api.genesisHash,
        isDevelopment,
        ss58Format,
        store,
        type: isEthereum ? "ethereum" : "ed25519",
      },
      injectedAccounts
    );

  const defaultSection = Object.keys(api.tx)[0];
  const defaultMethod = Object.keys(api.tx[defaultSection])[0];
  const apiDefaultTx = api.tx[defaultSection][defaultMethod];
  const apiDefaultTxSudo =
    (api.tx.system && api.tx.system.setCode) || apiDefaultTx;

  setDeriveCache(api.genesisHash.toHex(), deriveMapCache);

  return {
    apiDefaultTx,
    apiDefaultTxSudo,
    injectedAccounts,
    hasInjectedAccounts: injectedAccounts.length !== 0,
    isApiReady: true,
    isDevelopment: isEthereum ? false : isDevelopment,
    isEthereum,
    specName: api.runtimeVersion.specName.toString(),
    specVersion: api.runtimeVersion.specVersion.toString(),
    systemChain,
    systemName,
    systemVersion,
  };
}

async function retrieve(
  api: ApiPromise,
  injectedPromise: Promise<InjectedExtension[]>
): Promise<ChainData> {
  const [
    chainProperties,
    systemChain,
    systemChainType,
    systemName,
    systemVersion,
    injectedAccounts,
  ] = await Promise.all([
    api.rpc.system.properties(),
    api.rpc.system.chain(),
    api.rpc.system.chainType
      ? api.rpc.system.chainType()
      : Promise.resolve(registry.createType("ChainType", "Live")),
    api.rpc.system.name(),
    api.rpc.system.version(),
    getInjectedAccounts(injectedPromise),
  ]);

  return {
    injectedAccounts,
    properties: registry.createType("ChainProperties", {
      ss58Format: api.consts.system?.ss58Prefix || chainProperties.ss58Format,
      tokenDecimals: chainProperties.tokenDecimals,
      tokenSymbol: chainProperties.tokenSymbol,
    }),
    systemChain: (systemChain || "<unknown>").toString(),
    systemChainType,
    systemName: systemName.toString(),
    systemVersion: systemVersion.toString(),
  };
}

function useApi() {
  // const [state, setState] = useState<ApiState>({} as unknown as ApiState);
  const [state, setState] = useState<ApiState>({
    hasInjectedAccounts: false,
    isApiReady: false,
  } as unknown as ApiState);
  // const url = "wss://peregrine.kilt.io/";
  // const url = "wss://peregrine.kilt.io/parachain-public-ws/";
  const url = "wss://spiritnet.kilt.io/";

  const [isApiConnected, setIsApiConnected] = useState(false);
  const [isApiInitialized, setIsApiInitialized] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [extensions, setExtensions] = useState<
    InjectedExtension[] | undefined
  >();

  const setActiveAccount = (account) => {
    setCurrentAccount(account);
  };

  const connect = async () => {
    const provider = new WsProvider(url);

    const typesDev = getDevTypes();

    api = await ApiPromise.create({ provider });

    const injectedPromise = web3Enable("POC");

    injectedPromise
      .then(async (res) => {
        console.log(3333, res);
        if (res && res.length > 0) {
          const res = await retrieve(api, injectedPromise);
          setIsApiInitialized(true);
          setIsApiConnected(true);
        }
        const accounts = res?.find((it) => it.name === "Sporran")?.accounts;
        setExtensions(res);
        accounts?.get().then((acc) => {
          console.log(76666, res);
          setAccounts(acc);
        });
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  const value = useMemo<ApiProps>(
    () => ({
      ...state,
      api,
      apiError,
      url,
      connect,
      accounts,
      currentAccount,
      setActiveAccount,
      extensions,
      isApiConnected,
      isApiInitialized,
      isWaitingInjected: !extensions,
    }),
    [
      apiError,
      extensions,
      isApiConnected,
      isApiInitialized,
      state,
      url,
      accounts,
      currentAccount,
    ]
  );

  console.log(7777, value);

  return value;

  // if (!isApiInitialized) {
  //   return (
  //     <div className="loading">
  //       {/* <div className="connecting">
  //         <img src={loading} alt="loading" className="img" />
  //       </div> */}
  //       {children}
  //     </div>
  //   );
  // }

  // return <ApiProvider value={value}>{children}</ApiProvider>;
}

export default useApi;
