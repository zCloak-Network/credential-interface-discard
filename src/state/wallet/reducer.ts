/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-03-17 22:12:00
 */
import { createSlice } from "@reduxjs/toolkit";

export interface WalletState {
  password: string;
  identities: any[];
  currentIdentity: any;
}

const initialState = {
  password: "",
  identities: [],
  currentIdentity: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    savePassword(state, { payload: { password } }) {
      state.password = password;
    },
    saveIdentity(state, { payload: { identity } }) {
      state.identities = state.identities.concat({
        ...identity,
        createdAt: Date.now(),
      });
    },

    saveCurrIdentity(state, { payload: { identity } }) {
      state.currentIdentity = identity;
    },

    updateIdentity(state, { payload: { identity } }) {
      state.identities = state.identities.map((it) => {
        if (it.account.address === identity.account.address) {
          it = identity;
        }

        return it;
      });
    },
  },
});

export const { saveIdentity, savePassword, saveCurrIdentity, updateIdentity } =
  walletSlice.actions;
export default walletSlice.reducer;
