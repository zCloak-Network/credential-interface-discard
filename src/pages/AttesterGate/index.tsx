/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-29 13:55:08
 * @LastEditTime: 2022-04-01 14:29:32
 */
import React, { useEffect, useState } from "react";
import * as Kilt from "@kiltprotocol/sdk-js";
import Loading from "../../components/Loading";
import CreateDid from "./CreateDid";
import { useAddPopup } from "../../state/application/hooks";
import {
  getFullDid,
  generateFullDid,
  generateAccount,
  generateFullKeypairs,
} from "../../utils/accountUtils";
import {
  useUpdateAttesters,
  useGetCurrIdentity,
  useSaveCurrIdentity,
} from "../../state/wallet/hooks";
import EnterPasswordModal from "../../components/EnterPasswordModal";
import { addAttester } from "../../services/api";

type Props = {
  resetPassword: () => void;
  children: React.ReactElement;
};

const AttesterGate: React.FC<Props> = ({ resetPassword, children }) => {
  const addPopup = useAddPopup();
  const currAccount = useGetCurrIdentity();
  const updateAttesters = useUpdateAttesters();
  const saveCurrIdentity = useSaveCurrIdentity();
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState(null);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [enterPasswordStatus, setEnterPasswordStatus] =
    useState<boolean>(false);

  const getMyBalance = async () => {
    if (currAccount?.account?.address) {
      await setLoading(true);
      const balance = await Kilt.Balance.getBalances(
        currAccount.account.address
      );
      await setLoading(false);
      return setBalance(Number(balance.free.toString()));
    }
  };

  const handleGenerateFullDid = async () => {
    if (currAccount.account.address) {
      await setCreateLoading(true);
      const keystore = new Kilt.Did.DemoKeystore();

      const keys = await generateFullKeypairs(keystore, currAccount.mnemonic);
      const account = await generateAccount(currAccount.mnemonic);

      try {
        const fullDid = await generateFullDid(keystore, account, keys);
        const newAccount = { ...currAccount, fullDid: fullDid };
        await updateAttesters(newAccount);

        await addPopup({
          txn: {
            hash: "",
            success: true,
            title: "SUCCESS",
            summary: `Fulldid successfully created.`,
          },
        });
        await setCreateLoading(false);
        await addAttester({
          address: currAccount.account.address,
          did: fullDid.did,
        });
        await saveCurrIdentity(newAccount);
        await setEnterPasswordStatus(false);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleCreate = () => {
    setEnterPasswordStatus(true);
  };

  const getDid = async () => {
    // 先去链上查询，确认是否真的没有；因为可能生成fullDid的时候，用户关闭页面，导致fullDid没有存在本地
    if (currAccount?.account) {
      const fullDid = await getFullDid(currAccount?.account?.address);
      if (fullDid) {
        // 更新fullDid
        const newAccount = { ...currAccount, fullDid: fullDid };
        await updateAttesters(newAccount);
      }
    }
  };

  useEffect(() => {
    getMyBalance();
    getDid();
  }, [currAccount]);

  if (currAccount?.fullDid?.did) {
    return children;
  }

  if (loading) {
    return <Loading messgage="Connecting to chain" />;
  }

  return (
    <>
      <CreateDid balance={balance} handleCreate={handleCreate} />
      <EnterPasswordModal
        handleCancel={() => {
          setEnterPasswordStatus(false);
        }}
        createLoading={createLoading}
        visible={enterPasswordStatus}
        resetPassword={resetPassword}
        handleSubmit={handleGenerateFullDid}
      />
    </>
  );
};
export default AttesterGate;
