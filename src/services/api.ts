/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-08 19:47:31
 * @LastEditTime: 2022-03-23 10:10:16
 */
import axios from "axios";
import { HOSTPREFIX } from "../constants";

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
export async function queryCtypes() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/ctypes/all`,
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

/** 发送message */
export async function getMessage(
  params: { receiver: string },
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
