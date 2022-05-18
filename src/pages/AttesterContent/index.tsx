/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 14:20:49
 * @LastEditTime: 2022-05-16 12:52:08
 */
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { Select } from "antd";
import DetailModal from "../DetailModal";
import * as Kilt from "@kiltprotocol/sdk-js";
import { useToggleDetailModal } from "../../state/application/hooks";
import { getMessage, sendAttestation } from "../../services/api";
import { useGetCurrIdentity } from "../../state/wallet/hooks";
import {
  getFullDid,
  generateLightDid,
  generateAccount,
  generateLightKeypairs,
  generateFullKeypairs,
} from "../../utils/accountUtils";
import Empty from "../../components/Empty";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import { useAddPopup } from "../../state/application/hooks";
import type { MessageBody } from "@kiltprotocol/sdk-js";
import { IMessage, IEncryptedMessage } from "@kiltprotocol/types";
import { IIdentity } from "../../state/wallet/reducer";

import "./index.scss";

const STATUS = ["Pending", "processed"];

const Option = Select.Option;

const Content: React.FC = () => {
  const [message, setMessage] = useState<IMessage[] | null>(null);
  const [selectItem, setSelectItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [attestLoading, setAttestLoading] = useState(false);
  const addPopup = useAddPopup();

  const toggleModal = useToggleDetailModal();
  const currIdentity = useGetCurrIdentity();

  const handleTypeChange = () => {
    // TODO
  };

  const handleClick = (data: IMessage) => {
    setSelectItem(data);
    toggleModal();
  };

  // TODO  Wrapping the decrypt function
  const decrypt = async (data: IEncryptedMessage, account: IIdentity) => {
    const keystore = new Kilt.Did.DemoKeystore();
    await generateFullKeypairs(keystore, account.mnemonic);

    const receiverFullDid = await getFullDid(account.account.address);

    const decryptedRequestForAttestationMessage = await Kilt.Message.decrypt(
      data,
      keystore,
      receiverFullDid
    );

    return decryptedRequestForAttestationMessage;
  };

  const decryptMessage = async (data: IEncryptedMessage[]) => {
    const dataAll: Promise<IMessage>[] = [];

    await data.forEach((it) => {
      if (!currIdentity) return;
      dataAll.push(decrypt(it, currIdentity));
    });

    return Promise.all(dataAll).then((res) => {
      return res;
    });
  };

  const queryMessage = async () => {
    if (currIdentity?.fullDid?.did) {
      await setLoading(true);
      const receiverFullDid = await getFullDid(currIdentity.account.address);

      const res = await getMessage({
        receiverKeyId: `${currIdentity.fullDid.did}#${
          receiverFullDid.encryptionKey!.id
        }`,
      });
      if (res.data.code === 200) {
        const decryptMessages = await decryptMessage(res.data.data);

        await setMessage(decryptMessages);
        await setLoading(false);
      }
    }
  };

  useEffect(() => {
    queryMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (!currIdentity || !currIdentity.fullDid) return;

    if (selectItem.body.type === Kilt.Message.BodyType.REQUEST_ATTESTATION) {
      setAttestLoading(true);
      try {
        // const request = Kilt.RequestForAttestation.fromClaim(
        //   selectItem.body.content.requestForAttestation.claim
        // );
        const request = selectItem.body.content.requestForAttestation;
        const keystore = new Kilt.Did.DemoKeystore();
        const keystore2 = new Kilt.Did.DemoKeystore();

        const lightKeypairs = await generateLightKeypairs(
          keystore,
          currIdentity.mnemonic
        );
        await generateLightDid(lightKeypairs);

        // await request.signWithDidKey(
        //   keystore,
        //   lightDid,
        //   lightDid.authenticationKey.id
        // );

        const attestation = Kilt.Attestation.fromRequestAndDid(
          request,
          currIdentity.fullDid.did
        );

        const fullDid = await getFullDid(currIdentity.fullDid.identifier);
        const account = await generateAccount(currIdentity.mnemonic);

        const tx = await attestation.getStoreTx();
        const extrinsic = await fullDid.authorizeExtrinsic(
          tx,
          keystore,
          account.address
        );
        await Kilt.BlockchainUtils.signAndSubmitTx(extrinsic, account, {
          resolveOn: Kilt.BlockchainUtils.IS_FINALIZED,
          reSign: true,
        });

        const messageBody = {
          content: {
            attestation: { ...attestation },
            request: request,
          },
          type: Kilt.Message.BodyType.SUBMIT_ATTESTATION,
        };

        const messageBack = new Kilt.Message(
          // TODO 强行断言了messageBody
          messageBody as MessageBody,
          currIdentity.fullDid.did,
          selectItem.sender
        );

        await generateFullKeypairs(keystore2, currIdentity.mnemonic);

        const receiver = Kilt.Did.LightDidDetails.fromUri(selectItem.sender);

        const encryptedPresentationMessage = await messageBack.encrypt(
          fullDid.encryptionKey!.id,
          fullDid,
          keystore2,
          receiver.assembleKeyId(receiver.encryptionKey!.id)
        );

        await sendAttestation({ ...encryptedPresentationMessage });

        await addPopup({
          txn: {
            hash: "",
            success: true,
            title: "SUCCESS",
            summary: `Attestation successfully created.`,
          },
        });
        toggleModal();

        console.log("Attester -> submit attestation...");
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
      setAttestLoading(false);
    }
  };

  return (
    <div className="attester-content">
      {message && message.length > 0 && !loading && (
        <>
          <div className="select-wrapper">
            <Select
              defaultValue=""
              onChange={handleTypeChange}
              className="status-select"
            >
              <Option value={""} key="all">
                All
              </Option>
              {STATUS.map((it) => (
                <Option value={it} key={it}>
                  {it}
                </Option>
              ))}
            </Select>
          </div>
          <div className="header">
            <span></span>
            <span>Claimer</span>
            <span>Ctype</span>
            <span>status</span>
            <span>Time</span>
            <span></span>
          </div>
          <div className="content-list">
            {message.map((it, index: number) => (
              <ListItem
                data={it}
                index={index + 1}
                key={index}
                handleClick={handleClick}
              />
            ))}
          </div>
        </>
      )}

      {message && message.length === 0 && (
        <Empty description="Your attestion will appear here." />
      )}
      <DetailModal
        data={selectItem?.body.content.requestForAttestation}
        footer={
          <div>
            <Button
              type="primary"
              style={{ height: "60px", marginTop: "10px", width: "100%" }}
              onClick={handleSubmit}
              loading={attestLoading}
            >
              Attest Claim
            </Button>
          </div>
        }
      />
      {loading && <Loading />}
    </div>
  );
};
export default Content;
