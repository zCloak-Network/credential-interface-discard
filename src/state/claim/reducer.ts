/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-05-16 11:48:44
 */
import { createSlice } from "@reduxjs/toolkit";
import { IClaim } from "@kiltprotocol/types";

export interface IClaimSingle  {
  id: string;
  claim: IClaim;
  meta: {
    alias: string;
    time: string;
  };
  requestForAttestations: any;
  attestedClaims: any;
}

export type SerializedState = {
  claims: IClaimSingle[]
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
