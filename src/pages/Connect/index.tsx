/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-05-20 16:31:09
 */
import React, { ReactElement } from "react";
import FileSaver from "file-saver";
import Modal from "../../components/Modal";
import { Image } from "@davatar/react";
import { useNavigate } from "react-router-dom";
import { shortenHash } from "../../utils";
import {
  useGetClaimers,
  useGetAttesters,
  useSaveCurrIdentity,
  useGetCurrIdentity,
} from "../../state/wallet/hooks";
import {
  useModalOpen,
  useToggleChooseAccountModal,
} from "../../state/application/hooks";
import useRole from "../../hooks/useRole";
import CopyHelper from "../../components/Copy";
import { ApplicationModal } from "../../state/application/reducer";
import { IIdentity } from "../../state/wallet/reducer";

import "./index.scss";

export default function Connect(): ReactElement {
  const navigate = useNavigate();
  const isClaimer = useRole();
  const claimers = useGetClaimers();
  const attesters = useGetAttesters();
  const data = isClaimer ? claimers : attesters;
  const currAccount = useGetCurrIdentity();
  const saveCurrIdentity = useSaveCurrIdentity();
  const connectWalletModalOpen = useModalOpen(ApplicationModal.CHOOSE_ACCOUNT);
  const toggleConnectWalletModal = useToggleChooseAccountModal();

  const handleClick = (value: IIdentity) => {
    saveCurrIdentity(value);
    toggleConnectWalletModal();
  };

  const handleCreate = () => {
    if (isClaimer) {
      navigate("/credential/user/register-again");
    } else {
      navigate("/credential/attester/register-again");
    }
    toggleConnectWalletModal();
  };

  const handleDownload = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currAccount) return;

    const blob = await new Blob([JSON.stringify(currAccount.mnemonic)], {
      type: "text/plain;charset=utf-8",
    });

    await FileSaver.saveAs(blob, "mnemonic.txt");
  };

  return (
    <>
      <Modal
        title="Choose Account"
        visible={connectWalletModalOpen}
        onCancel={toggleConnectWalletModal}
        wrapClassName="walletModal"
      >
        <ul className="wallets">
          {data?.map((it) => {
            const address = it.account.address;

            return (
              <li
                className="account-item"
                key={address}
                onClick={() => {
                  handleClick(it);
                }}
              >
                <div className="left">
                  <Image address={address} size={18} />
                  <span className="account-addr">{shortenHash(address)}</span>
                </div>
                <div className="right">
                  {currAccount?.account?.address === address && (
                    <i className="iconfont icon_success2" />
                  )}
                  <CopyHelper toCopy={address} />
                  <i
                    className="iconfont icon_download"
                    onClick={handleDownload}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className="footer" onClick={handleCreate}>
          Create A New Account
        </div>
      </Modal>
      {/* <EnterPasswordModal
        handleCancel={() => {
          setEnterPasswordStatus(false);
        }}
        visible={enterPasswordStatus}
        resetPassword={resetPassword}
        handleSubmit={handleDownload}
      /> */}
    </>
  );
}
