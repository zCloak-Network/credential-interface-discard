/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-05-18 14:46:44
 */
import { createSlice } from "@reduxjs/toolkit";
import {
  IDidDetails,
  KeyringPair,
} from "@kiltprotocol/types";

export interface IIdentity {
    account: KeyringPair,
    mnemonic: string,
    lightDidDetails: IDidDetails,
    fullDid?: IDidDetails & {
      identifier: any
    }
}

export interface WalletState {
  password: string;
  currentIdentity: IIdentity | null;
  currentIdentityBalance: any;
  claimers: IIdentity[];
  attesters: IIdentity[];
}

const initialState: WalletState = {
  password: "",
  currentIdentity: null,
  currentIdentityBalance: null,
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

    saveCurrIdentityBalance(state, { payload: { balance } }) {
      state.currentIdentityBalance = balance;
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
  saveCurrIdentityBalance,
} = walletSlice.actions;
export default walletSlice.reducer;
