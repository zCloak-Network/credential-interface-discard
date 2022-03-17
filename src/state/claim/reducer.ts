/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-03-16 16:24:03
 */
import { createSlice } from "@reduxjs/toolkit";
// import { IClaim } from "@kiltprotocol/types";
import Immutable from "immutable";

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
}

export type Entry = {
  id: string;
  claim: any;
  attestedClaims: any;
  requestForAttestations: any;
  meta: {
    alias: string;
  };
};

type State = {
  claims: Immutable.Map<string, Entry>;
};

export type ImmutableState = Immutable.Record<State>;

export type SerializedState = {
  claims: Array<{
    id: string;
    claim: any;
    meta: any;
    requestForAttestations: any;
    attestedClaims: any;
  }>;
};

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

export interface ApplicationState {
  readonly claims: any;
  readonly popupList: PopupList;
  readonly openModal: ApplicationModal | null;
}

const initialState: ApplicationState = {
  openModal: null,
  popupList: [],
  claims: [],
  // claims: [
  //   {
  //     cTypeHash:
  //       "0xf1dad8a94ee9b339613b74abfe7b642b3583799175ee7431d76f91cdc2f7a999",
  //   },
  // ],
};

const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    saveClaim(state, { payload: { claim, meta, claimId } }) {
      state.claims = state.claims.concat({
        attestedClaims: [],
        requestForAttestations: [],
        claim,
        id: claimId,
        meta,
      });
    },
  },
});

export const { saveClaim } = claimSlice.actions;
export default claimSlice.reducer;
