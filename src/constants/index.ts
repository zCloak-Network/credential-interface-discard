/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 11:52:05
 * @LastEditTime: 2022-05-24 15:42:14
 *
 */

export const NETWORKID = 1287;

export const WSSURL = "wss://peregrine.kilt.io/parachain-public-ws/";
// export const WSSURL = "wss://peregrine.kilt.io/";
// wss://spiritnet.kilt.io/:
// export const WSSURL = "wss://spiritnet.kilt.io/";
// export const WSSURL = "wss://spiritnet.api.onfinality.io/public-ws";

// 日期格式配置
export const timeFormat = {
  dateMinute: "YYYY-MM-DD HH:mm",
  dateTime: "YYYY-MM-DD HH:mm:ss",
  date: "YYYY-MM-DD",
  dateYear: "YYYY",
  dateMonth: "YYYY-MM",
  dateWeek: "dddd",
  time: "HH:mm:ss",
  dateTimeNoSeparator: "YYYYMMDDHHmmss",
  dateNoSeparator: "YYYYMMDD",
};

export const STATUS = [
  {
    title: "Verified True",
    color: "#51DC8E",
  },
  {
    title: "Verified False",
    color: "#FF3E6C",
  },
  {
    title: "Verifing",
    color: "#FF9E3E ",
  },
];

export const NetworkContextName = "NETWORK";

export const DEFAULT_TXN_DISMISS_MS = 25000;

export const IPFSURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
