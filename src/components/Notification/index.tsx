/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-11 14:39:56
 * @LastEditTime: 2021-12-13 13:55:58
 */
import React, { useEffect, useContext } from "react";
import { notification } from "antd";

import {
  KiltProofsAdddress,
  RegulatedTransferAdddress,
  SampleTokenAdddress,
} from "../../constants/contract/address";

import MyContext from "../Context";

type Props = {
  web3: any;
};

export default function index() {
  const { web3 } = useContext(MyContext) as Props;
  //   console.log(33333330000);
  //   const openNotification = () => {
  //     notification.open({
  //       message: "Notification Title",
  //       description:
  //         "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  //       onClick: () => {
  //         console.log("Notification Clicked!");
  //       },
  //     });
  //   };

  useEffect(() => {
    //   openNotification();
    // web3.eth
    //   .subscribe(
    //     "logs",
    //     {
    //       address: [
    //         KiltProofsAdddress,
    //         RegulatedTransferAdddress,
    //         SampleTokenAdddress,
    //       ],
    //       // topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
    //     },
    //     (error, result) => {
    //       if (error) console.error(error);
    //       console.log(7777666, result);
    //     }
    //   )
    //   .on("connected", function (subscriptionId) {
    //     console.log(1111, subscriptionId);
    //   })
    //   .on("data", function (log) {
    //     console.log(2220000000, log);
    //     // eventInfo.push(log);
    //     // seInfo([...eventInfo]);
    //   });
  }, []);

  return null;
}
