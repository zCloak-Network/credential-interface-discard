/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-16 19:01:12
 * @LastEditTime: 2022-04-14 12:05:18
 */
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

declare interface Window {
  projectConf: { wssUrl: string };
  zCloak: {
    zkID: {
      getIfCreatePassword: () => Promise<any>;
      getCredentialByCHash: (...args) => Promise<any>;
      name: string;
      openzkIDPopup: (...args) => Promise<any>;
      version: string;
    };
  };
  web3: {
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    isMetaMask?: true;
    request: (request: { method: string; params?: Array<any> }) => Promise<any>;
    autoRefreshOnNetworkChange?: boolean;
  };
  ethereum: {
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    isMetaMask?: true;
    request: (request: { method: string; params?: Array<any> }) => Promise<any>;
    autoRefreshOnNetworkChange?: boolean;
  };
}
