// import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionDetails } from "./reducer";
import { addTransaction } from "./reducer";
import { AppState } from "../PersistentStore";

import { useActiveWeb3React } from "../../hooks/web3";

export interface TransactionResponseLight {
  transactionHash: string;
}

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponseLight,
  customData?: {
    title?: string;
    summary?: string;
    approval?: { tokenAddress: string; spender: string };
    claim?: { recipient: string };
    archer?: {
      rawTransaction: string;
      deadline: number;
      nonce: number;
      ethTip: string;
    };
  }
) => void {
  const { chainId, account } = useActiveWeb3React();
  const dispatch = useDispatch();

  return useCallback(
    (
      response: TransactionResponseLight,
      {
        title,
        summary,
        approval,
        claim,
        archer,
      }: {
        title?: string;
        summary?: string;
        claim?: { recipient: string };
        approval?: { tokenAddress: string; spender: string };
        archer?: {
          rawTransaction: string;
          deadline: number;
          nonce: number;
          ethTip: string;
        };
      } = {}
    ) => {
      if (!account) return;
      if (!chainId) return;

      const { transactionHash } = response;
      if (!transactionHash) {
        throw Error("No transaction hash found.");
      }
      dispatch(
        addTransaction({
          hash: transactionHash,
          from: account,
          chainId,
          approval,
          summary,
          title,
          claim,
          archer,
        })
      );
    },
    [dispatch, chainId, account]
  );
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React();

  const state = useSelector((state: AppState) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();

  if (!transactionHash || !transactions[transactionHash]) return false;

  return !transactions[transactionHash].receipt;
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000;
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(
  tokenAddress: string | undefined,
  spender: string | undefined
): boolean {
  const allTransactions = useAllTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === "string" &&
      typeof spender === "string" &&
      Object.keys(allTransactions || {}).some((hash) => {
        const tx = allTransactions[hash];
        if (!tx) return false;
        if (tx.receipt) {
          return false;
        } else {
          const approval = tx.approval;
          if (!approval) return false;
          return (
            approval.spender === spender &&
            approval.tokenAddress === tokenAddress &&
            isTransactionRecent(tx)
          );
        }
      }),
    [allTransactions, spender, tokenAddress]
  );
}

// watch for submissions to claim
// return null if not done loading, return undefined if not found
export function useUserHasSubmittedClaim(account?: string): {
  claimSubmitted: boolean;
  claimTxn: TransactionDetails | undefined;
} {
  const allTransactions = useAllTransactions();

  // get the txn if it has been submitted
  const claimTxn = useMemo(() => {
    const txnIndex = Object.keys(allTransactions || {}).find((hash) => {
      const tx = allTransactions[hash];
      return tx.claim && tx.claim.recipient === account;
    });
    return txnIndex && allTransactions[txnIndex]
      ? allTransactions[txnIndex]
      : undefined;
  }, [account, allTransactions]);

  return { claimSubmitted: Boolean(claimTxn), claimTxn };
}
