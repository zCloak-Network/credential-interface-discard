/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-09 15:01:30
 * @LastEditTime: 2022-05-19 16:50:31
 */
import React from "react";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../../utils/getLibrary";
import Web3ReactManager from "../../components/Web3ReactManager";
import { NetworkContextName } from "../../constants";

interface IProps {
  children: React.ReactElement;
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const Web3Gate: React.FC<IProps> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>{children}</Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};
export default Web3Gate;
