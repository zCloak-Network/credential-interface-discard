/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 18:44:00
 * @LastEditTime: 2022-03-30 18:34:09
 */
import React from "react";
import Connect from "../Connect";
import NewClaimModal from "../../components/NewClaimModal";

type Props = {
  resetPassword: () => void;
};

export default function Modals({ resetPassword }: Props) {
  return (
    <>
      <Connect resetPassword={resetPassword} />
      <NewClaimModal />
    </>
  );
}
