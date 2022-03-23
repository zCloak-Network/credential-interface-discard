/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2022-03-23 21:52:55
 */
import { createSlice } from "@reduxjs/toolkit";

export interface AttestationState {
  attestations: any;
}

const initialState: AttestationState = {
  attestations: [],
};

const attestationSlice = createSlice({
  name: "attestation",
  initialState,
  reducers: {
    saveAttestation(
      state,
      { payload: { requestforAttestation, attestation } }
    ) {
      state.attestations = state.attestations.concat({
        requestforAttestation: requestforAttestation,
        attestation: attestation,
      });
    },
  },
});

export const { saveAttestation } = attestationSlice.actions;
export default attestationSlice.reducer;
