/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-08 19:47:31
 * @LastEditTime: 2022-05-24 16:34:35
 */
import axios from "axios";

const CREDENTIAL_SERVICE_URL = process.env.REACT_APP_CREDENTIAL_SERVICE_URL
const ZKID_SERVICE_URL = process.env.REACT_APP_ZKID_SERVICE_URL

/** 添加ctype */
export async function addCtype(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${CREDENTIAL_SERVICE_URL}/ctypes/add`,
    data: {
      ...data,
    },
  });
}

/** 获取所有ctype */
export async function queryCtypes(params: { owner: string | null}) {
  return axios({
    method: "get",
    url: `${CREDENTIAL_SERVICE_URL}/ctypes/all`,
    params: {
      ...params,
    },
  });
}

/** 发送message */
export async function sendMessage(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${CREDENTIAL_SERVICE_URL}/message/add`,
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
    url: `${CREDENTIAL_SERVICE_URL}/message/one`,
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
    url: `${CREDENTIAL_SERVICE_URL}/attestation/add`,
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
    url: `${CREDENTIAL_SERVICE_URL}/attestation/one`,
    params: {
      ...params,
    },
  });
}

/** 添加attester */
export async function addAttester(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${CREDENTIAL_SERVICE_URL}/attester/add`,
    data: {
      ...data,
    },
  });
}

/** 获取attester */
export async function getAttester() {
  return axios({
    method: "get",
    url: `${CREDENTIAL_SERVICE_URL}/attester/all`,
  });
}

/** 获取attestation */
export async function submitClaim(data: any, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${CREDENTIAL_SERVICE_URL}/admin-attester/submit-claim`,
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
    url: `${CREDENTIAL_SERVICE_URL}/admin-attester/attestation-status`,
    params: {
      ...params,
    },
  });
}

export async function getProof(
  params: { dataOwner: string, requestHash: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${ZKID_SERVICE_URL}/proof/process`,
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
    url: `${ZKID_SERVICE_URL}/mint-poap`,
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
    url: `${CREDENTIAL_SERVICE_URL}/user/faucet`,
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
    url: `${CREDENTIAL_SERVICE_URL}/user/faucet-status`,
    params: {
      ...params,
    },
  });
}
