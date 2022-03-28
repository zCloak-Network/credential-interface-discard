/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-03-28 21:51:47
 */
import { createSlice } from "@reduxjs/toolkit";

export interface WalletState {
  password: string;
  currentIdentity: any;
  claimers: any[];
  attesters: any[];
}

const initialState = {
  password: "",
  currentIdentity: null,
  claimers: [],
  attesters: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    savePassword(state, { payload: { password } }) {
      state.password = password;
    },

    saveClaimers(state, { payload: { identity } }) {
      state.claimers = state.claimers.concat({
        ...identity,
        createdAt: Date.now(),
      });
    },

    saveAttesters(state, { payload: { identity } }) {
      state.attesters = state.attesters.concat({
        ...identity,
        createdAt: Date.now(),
      });
    },

    saveCurrIdentity(state, { payload: { identity } }) {
      state.currentIdentity = identity;
    },

    updateClaimers(state, { payload: { identity } }) {
      state.claimers = state.claimers.map((it) => {
        if (it.account.address === identity.account.address) {
          it = identity;
        }

        return it;
      });
    },

    updateAttesters(state, { payload: { identity } }) {
      state.attesters = state.attesters.map((it) => {
        if (it.account.address === identity.account.address) {
          it = identity;
        }

        return it;
      });
    },
  },
});

export const {
  saveClaimers,
  saveAttesters,
  savePassword,
  saveCurrIdentity,
  updateClaimers,
  updateAttesters,
} = walletSlice.actions;
export default walletSlice.reducer;
