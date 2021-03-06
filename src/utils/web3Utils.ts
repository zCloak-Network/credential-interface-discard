/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-10 15:57:03
 * @LastEditTime: 2022-04-13 21:18:22
 */
import Web3 from "web3";

export function getContract(abi: any, address: string) {
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(abi, address);

  return contract;
}
