/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 18:44:00
 * @LastEditTime: 2022-05-20 16:41:50
 */
import Connect from "../Connect";
import NewClaimModal from "../../components/NewClaimModal";
import ConnectWallet from "../ConnectWallet";
import ErrorNetworkModal from "../../components/ErrorNetworkModal";
import GuideReplayModal from "../GuideReplayModal";

export default function Modals() {
  return (
    <>
      <Connect />
      <NewClaimModal />
      <ConnectWallet />
      <ErrorNetworkModal />
      <GuideReplayModal />
    </>
  );
}
