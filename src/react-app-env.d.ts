/// <reference types="react-scripts" />
interface Window {
    // walletLinkExtension is injected by the Coinbase Wallet extension
    walletLinkExtension?: any
    ethereum?: {
      // value that is populated and returns true by the Coinbase Wallet mobile dapp browser
      isCoinbaseWallet?: true
      isMetaMask?: true
      on?: (...args: any[]) => void
      removeListener?: (...args: any[]) => void
      autoRefreshOnNetworkChange?: boolean,
      request: (request: { method: string; params?: Array<any> }) => Promise<any>;
    }
    web3?: Record<string, unknown>,
    zCloak: {
        zkID: {
          getIfCreatePassword: () => Promise<any>;
          getCredentialByCHash: (...args) => Promise<any>;
          name: string;
          openzkIDPopup: (...args) => Promise<any>;
          version: string;
        };
    };
}