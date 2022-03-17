/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-03-16 15:53:00
 */
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { DEFAULT_TXN_DISMISS_MS } from "../../constants";

export type PopupContent = {
  txn: {
    hash: string;
    success: boolean;
    summary?: string;
    title?: string;
  };
};
// | {
//     listUpdate: {
//       listUrl: string
//       // oldList: TokenList
//       // newList: TokenList
//       auto: boolean
//     }
//   }

export enum ApplicationModal {
  WALLET,
  CONNECT_WALLET,
  SELECT_TOKEN,
  ERROR,
  SUBMIT_PROOF,
  ACCOUNT_DETAILS,
  CREATE_CLAIM,
  REQUEST_ATTESTATION,
  ATTESTATION_DETAIL,
}

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

export interface ApplicationState {
  readonly popupList: PopupList;
  readonly openModal: ApplicationModal | null;
}

const initialState: ApplicationState = {
  openModal: null,
  popupList: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    addPopup(
      state,
      { payload: { content, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } }
    ) {
      state.popupList = (
        key
          ? state.popupList.filter((popup) => popup.key !== key)
          : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
    },
    removePopup(state, { payload: { key } }) {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    },
  },
});

export const { setOpenModal, addPopup, removePopup } = applicationSlice.actions;
export default applicationSlice.reducer;
