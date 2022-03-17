/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2022-03-17 17:59:09
 */
import { useCallback } from "react";
import { AppState } from "../PersistentStore";
import { useDispatch, useSelector } from "react-redux";
import {
  saveIdentity,
  savePassword,
  saveCurrIdentity,
  updateIdentity,
} from "./reducer";

export function useGetPassword(): AppState["wallet"]["password"] {
  const password = useSelector((state: AppState) => state.wallet.password);
  return password;
}

export function useGetidentities(): AppState["wallet"]["identities"] {
  const data = useSelector((state: AppState) => state.wallet.identities);
  return data;
}

export function useGetCurrIdentity(): AppState["wallet"]["currentIdentity"] {
  const data = useSelector((state: AppState) => state.wallet.currentIdentity);
  return data;
}

export function useSavePassword(): (password) => void {
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

export function useSaveIdentity(): (identity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        saveIdentity({
          identity,
        })
      );
    },
    [dispatch]
  );
}

export function useSaveCurrIdentity(): (identity) => void {
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

export function useUpdateIdentity(): (identity) => void {
  const dispatch = useDispatch();

  return useCallback(
    (identity) => {
      dispatch(
        updateIdentity({
          identity,
        })
      );
    },
    [dispatch]
  );
}
