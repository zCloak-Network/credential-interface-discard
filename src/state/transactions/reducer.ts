/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-24 11:06:55
 * @LastEditTime: 2022-03-31 16:16:54
 */
import { createSlice } from "@reduxjs/toolkit";

const now = () => new Date().getTime();

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

export interface TransactionDetails {
  hash: string;
  approval?: { tokenAddress: string; spender: string };
  title?: string;
  summary?: string;
  claim?: { recipient: string };
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
  archer?: {
    deadline: number;
    rawTransaction: string;
    nonce: number;
    ethTip: string;
  };
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

const initialState: TransactionState = {};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      transactions,
      {
        payload: {
          chainId,
          from,
          hash,
          approval,
          title,
          summary,
          claim,
          archer,
        },
      }
    ) => {
      if (transactions[chainId]?.[hash]) {
        throw Error("Attempted to add existing transaction.");
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = {
        hash,
        approval,
        summary,
        title,
        claim,
        from,
        addedTime: now(),
        archer,
      };
      transactions[chainId] = txs;
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
