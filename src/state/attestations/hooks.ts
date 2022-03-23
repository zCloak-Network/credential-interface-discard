/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2022-03-23 22:09:58
 */
import { useCallback } from "react";
import { AppState } from "../PersistentStore";
import { useDispatch, useSelector } from "react-redux";
import { saveAttestation } from "./reducer";

// get the list of active popups
export function useGetAttestations(): AppState["attestation"]["attestations"] {
  const list = useSelector((state: AppState) => state.attestation.attestations);
  return list;
}

export function useSaveAttestation(): (
  requestforAttestation: any,
  attestation: any
) => void {
  const dispatch = useDispatch();

  return useCallback(
    (requestforAttestation: any, attestation: any) => {
      dispatch(
        saveAttestation({
          requestforAttestation: requestforAttestation,
          attestation: attestation,
        })
      );
    },
    [dispatch]
  );
}
