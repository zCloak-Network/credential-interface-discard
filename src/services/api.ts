/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-08 19:47:31
 * @LastEditTime: 2022-03-16 21:46:49
 */
import axios from "axios";
import { HOSTPREFIX } from "../constants";

/** 获取所有token */
export async function queryToken() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/tokens`,
  });
}

/** 根据token获取program等 */
export async function queryDetailByToken(
  params: {
    /** token地址 */
    tokenAddress: string;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/tokens/rules`,
    params: {
      ...params,
    },
  });
}

/** 根据addr获取所有的proof */
export async function queryProofsByAddr(
  data: {
    /** address */
    dataOwner: string;
    // TODO
    programHash?: any;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/proofs`,
    data: {
      ...data,
    },
  });
}

/** 获取program  */
export async function queryPrograms() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/programs`,
  });
}

/**  查询是否有资格转账对应的proof  */
export async function queryQualification(
  params: {
    /** address */
    dataOwner: string;
    // TODO
    programHash: string;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/proofs/one`,
    params: {
      ...params,
    },
  });
}

/** 获取Activities  */
export async function queryActivities(
  params: {
    /** address */
    dataOwner: string;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/transfer/record`,
    params: {
      ...params,
    },
  });
}
//  ==============
/** 获取所有ctype */
export async function queryCtypes() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/ctypes/all`,
  });
}

/** 发送message */
export async function sendMessage(data: {}, options?: { [key: string]: any }) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/message/add`,
    data: {
      ...data,
    },
  });
}

export interface ICTypeInputProperty {
  title: string;
  $id: string;
  type: string;
  format?: string;
}
