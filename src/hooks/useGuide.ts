/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-28 18:24:04
 * @LastEditTime: 2022-05-18 17:45:47
 */
import { useLocation } from "react-router-dom";

export default function useGuide() {
  const location = useLocation();
  const isGuide = location.pathname.startsWith("/tutorial");

  return isGuide;
}
