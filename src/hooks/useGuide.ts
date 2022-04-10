/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-28 18:24:04
 * @LastEditTime: 2022-04-08 10:37:24
 */
import React from "react";
import { useLocation } from "react-router-dom";

export default function useGuide() {
  const location = useLocation();
  const isGuide = location.pathname.startsWith("/guide");

  return isGuide;
}
