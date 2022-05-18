/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2022-05-16 10:16:33
 */
import { useCallback } from "react";
import { AppState } from "../PersistentStore";
import { useDispatch, useSelector } from "react-redux";
import {
  saveClaimers,
  saveAttesters,
  savePassword,
  saveCurrIdentity,
  updateClaimers,
  updateAttesters,
  saveCurrIdentityBalance,
} from "./reducer";

import {IIdentity} from './reducer'

export function useGetPassword(): AppState["wallet"]["password"] {
  const password = useSelector((state: AppState) => state.wallet.password);
  return password;
}

export function useGetClaimers(): AppState["wallet"]["claimers"] {
  const data = useSelector((state: AppState) => state.wallet.claimers);
  return data;
}

export function useGetAttesters(): AppState["wallet"]["attesters"] {
  const data = useSelector((state: AppState) => state.wallet.attesters);
  return data;
}

export function useGetCurrIdentity(): AppState["wallet"]["currentIdentity"] {
  const data = useSelector((state: AppState) => state.wallet.currentIdentity);
  return data;
}

export function useGetCurrIdentityBalance(): AppState["wallet"]["currentIdentityBalance"] {
  const data = useSelector(
    (state: AppState) => state.wallet.currentIdentityBalance
  );
  return data;
}

export function useSavePassword(): (password: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (password) => {
      dispatch(
        savePassword({
          password,
        })
      );
    },
    [dispatch]
  );
}

export function useSaveClaimer(): (identity: IIdentity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        saveClaimers({
          identity,
        })
      );
    },
    [dispatch]
  );
}

export function useSaveAttester(): (identity: IIdentity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        saveAttesters({
          identity,
        })
      );
    },
    [dispatch]
  );
}

// TODO
export function useSaveCurrIdentityBalance(): (balance: any) => void {
  const dispatch = useDispatch();

  return useCallback(
    (balance) => {
      dispatch(
        saveCurrIdentityBalance({
          balance,
        })
      );
    },
    [dispatch]
  );
}

export function useSaveCurrIdentity(): (identity: IIdentity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        saveCurrIdentity({
          identity,
        })
      );
    },
    [dispatch]
  );
}

export function useUpdateClaimers(): (identity: IIdentity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        updateClaimers({
          identity,
        })
      );
    },
    [dispatch]
  );
}

export function useUpdateAttesters(): (identity: IIdentity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        updateAttesters({
          identity,
        })
      );
    },
    [dispatch]
  );
}
