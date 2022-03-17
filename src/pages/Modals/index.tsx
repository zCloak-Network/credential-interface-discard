/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 18:44:00
 * @LastEditTime: 2022-03-16 16:33:52
 */
import React from "react";
import Connect from "../Connect";
import NewClaimModal from "../../components/NewClaimModal";
import ErrorModal from "../../components/ErrorModal";

export default function Modals() {
  return (
    <>
      <Connect />
      <ErrorModal />
      <NewClaimModal />
    </>
  );
}
