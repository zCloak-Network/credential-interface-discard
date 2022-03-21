/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-03-21 20:58:30
 */
import { createSlice } from "@reduxjs/toolkit";
// import { IClaim } from "@kiltprotocol/types";

export type SerializedState = {
  claims: Array<{
    id: string;
    claim: any;
    meta: any;
    requestForAttestations: any;
    attestedClaims: any;
  }>;
};

export interface State {
  readonly claims: any;
}

const initialState: State = {
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
