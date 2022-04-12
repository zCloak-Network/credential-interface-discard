/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2022-04-11 23:18:10
 */
import { useMemo, useCallback } from "react";
import { AppState } from "../PersistentStore";
import { useDispatch, useSelector } from "react-redux";
import {
  ApplicationModal,
  setOpenModal,
  PopupContent,
  addPopup,
  removePopup,
} from "./reducer";
import { DEFAULT_TXN_DISMISS_MS } from "../../constants";

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector(
    (state: AppState) => state.application.openModal
  );
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open]
  );
}

export function useToggleSelectTokenModal(): () => void {
  return useToggleModal(ApplicationModal.SELECT_TOKEN);
}

export function useToggleErrorModal(): () => void {
  return useToggleModal(ApplicationModal.ERROR);
}

export function useToggleConnectWalletModal(): () => void {
  return useToggleModal(ApplicationModal.CONNECT_WALLET);
}

export function useToggleSubmitProofModal(): () => void {
  return useToggleModal(ApplicationModal.SUBMIT_PROOF);
}

export function useToggleAccountDetailsModal(): () => void {
  return useToggleModal(ApplicationModal.ACCOUNT_DETAILS);
}

export function useToggleCreateClaimModal(): () => void {
  return useToggleModal(ApplicationModal.CREATE_CLAIM);
}

export function useToggleRequestModal(): () => void {
  return useToggleModal(ApplicationModal.REQUEST_ATTESTATION);
}

export function useToggleDetailModal(): () => void {
  return useToggleModal(ApplicationModal.ATTESTATION_DETAIL);
}
export function useToggleGuideMessage(): () => void {
  return useToggleModal(ApplicationModal.GUIDE_MESSAGE);
}

// returns a function that allows adding a popup
export function useAddPopup(): (
  content: PopupContent,
  key?: string,
  removeAfterMs?: number
) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string, removeAfterMs?: number) => {
      dispatch(
        addPopup({
          content,
          key,
          removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS,
        })
      );
    },
    [dispatch]
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch]
  );
}

// get the list of active popups
export function useActivePopups(): AppState["application"]["popupList"] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}
