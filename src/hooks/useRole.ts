/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-28 18:24:04
 * @LastEditTime: 2022-04-29 11:36:14
 */
import React from "react";
import { useLocation } from "react-router-dom";

export default function useRole() {
  const location = useLocation();
  const isClaimer = !location.pathname.startsWith("/credential/attester");

  return isClaimer;
}
