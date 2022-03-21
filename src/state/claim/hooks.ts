/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2022-03-18 16:05:42
 */
import { useCallback } from "react";
import { AppState } from "../PersistentStore";
import { useDispatch, useSelector } from "react-redux";
import { saveClaim } from "./reducer";
import { PartialClaim } from "@kiltprotocol/types";
import { Crypto } from "@kiltprotocol/utils";

function hash(claim: PartialClaim): string {
  return Crypto.hashStr(JSON.stringify(claim));
}

// get the list of active popups
export function useGetClaims(): AppState["claim"]["claims"] {
  const list = useSelector((state: AppState) => state.claim.claims);
  return list;
}

export function useSaveClaim(): (claim: any, meta: any) => void {
  const dispatch = useDispatch();

  return useCallback(
    (claim: any, meta: any) => {
      dispatch(
        saveClaim({
          claim: claim,
          meta: meta,
          claimId: hash(claim),
        })
      );
    },
    [dispatch]
  );
}
