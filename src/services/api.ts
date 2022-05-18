/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-08 19:47:31
 * @LastEditTime: 2022-05-13 13:54:13
 */
import axios from "axios";
import { HOSTPREFIX, PROOFHOSTPREFIX } from "../constants";

/** 添加ctype */
export async function addCtype(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/ctypes/add`,
    data: {
      ...data,
    },
  });
}

/** 获取所有ctype */
export async function queryCtypes(params: { owner: string | null}) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/ctypes/all`,
    params: {
      ...params,
    },
  });
}

/** 发送message */
export async function sendMessage(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/message/add`,
    data: {
      ...data,
    },
  });
}

/** 获取message */
export async function getMessage(
  params: { receiverKeyId: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/message/one`,
    params: {
      ...params,
    },
  });
}

/** 发送attestation */
export async function sendAttestation(
  data: any,
  options?: { [key: string]: any }
) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/attestation/add`,
    data: {
      ...data,
    },
  });
}

/** 获取attestation */
export async function getAttestation(
  params: { receiverKeyId: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/attestation/one`,
    params: {
      ...params,
    },
  });
}

/** 添加attester */
export async function addAttester(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/attester/add`,
    data: {
      ...data,
    },
  });
}

/** 获取attester */
export async function getAttester() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/attester/all`,
  });
}

/** 获取attestation */
export async function submitClaim(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/admin-attester/submit-claim`,
    data: {
      ...data,
    },
  });
}

/** 获取attestation status */
export async function getAttestationStatus(
  params: { senderKeyId: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/admin-attester/attestation-status`,
    params: {
      ...params,
    },
  });
}

export async function getProof(
  params: { rootHash: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${PROOFHOSTPREFIX}/proof/result`,
    params: {
      ...params,
    },
  });
}

export async function getPoapId(
  params: { who: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${PROOFHOSTPREFIX}/mint-poap`,
    params: {
      ...params,
    },
  });
}

export async function getToken(
  params: { address: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/user/faucet`,
    params: {
      ...params,
    },
  });
}

export async function getTokenStatus(
  params: { address: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/user/faucet-status`,
    params: {
      ...params,
    },
  });
}
