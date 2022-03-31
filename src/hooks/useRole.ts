/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-28 18:24:04
 * @LastEditTime: 2022-03-28 20:59:08
 */
import React from "react";
import { useLocation } from "react-router-dom";

export default function useRole() {
  const location = useLocation();
  const isClaimer = !location.pathname.startsWith("/attester");

  return isClaimer;
}
