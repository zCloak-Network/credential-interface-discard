/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-29 13:55:08
 * @LastEditTime: 2022-05-18 18:21:59
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
  useGetAttesters,
  useUpdateAttesters,
  useGetCurrIdentity,
  useSaveCurrIdentity,
  useGetCurrIdentityBalance,
} from "../../state/wallet/hooks";
import EnterPasswordModal from "../../components/EnterPasswordModal";
import { addAttester } from "../../services/api";
import Empty from "../../components/Empty";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  resetPassword: () => void;
  children: React.ReactElement;
};

const AttesterGate: React.FC<Props> = ({ resetPassword, children }) => {
  const addPopup = useAddPopup();
  const navigate = useNavigate();
  const attesters = useGetAttesters();
  const currAccount = useGetCurrIdentity();
  const updateAttesters = useUpdateAttesters();
  const saveCurrIdentity = useSaveCurrIdentity();
  const balance = useGetCurrIdentityBalance();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [enterPasswordStatus, setEnterPasswordStatus] =
    useState<boolean>(false);

  const handleGenerateFullDid = async () => {
    if (!currAccount) return;

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
      if (error instanceof Error) {
        addPopup({
          txn: {
            hash: "",
            success: false,
            title: error.name,
            summary: error.message,
          },
        });
      }

      throw error;
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

  const handleCreateAccount = () => {
    navigate("/credential/register-again");
  };

  useEffect(() => {
    getDid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currAccount]);

  if (attesters.length === 0) {
    return (
      <Empty
        description={
          <Button
            onClick={handleCreateAccount}
            type="primary"
            style={{ width: "450px", height: "40px" }}
          >
            Create A New Account
          </Button>
        }
      ></Empty>
    );
  }

  if (currAccount?.fullDid?.did) {
    return children;
  }

  if (balance === null) {
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
