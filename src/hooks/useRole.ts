/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-28 18:24:04
 * @LastEditTime: 2022-05-18 17:45:43
 */
import { useLocation } from "react-router-dom";

export default function useRole() {
  const location = useLocation();
  const isClaimer = !location.pathname.startsWith("/credential/attester");

  return isClaimer;
}
