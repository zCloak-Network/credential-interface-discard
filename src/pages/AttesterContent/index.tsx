/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 14:20:49
 * @LastEditTime: 2022-03-21 20:57:28
 */
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { Select } from "antd";
import DetailModal from "../DetailModal";
import * as Kilt from "@kiltprotocol/sdk-js";
import { useToggleDetailModal } from "../../state/application/hooks";
import { getMessage } from "../../services/api";
import { useGetCurrIdentity } from "../../state/wallet/hooks";
import { getFullDid } from "../../utils/accountUtils";
import Empty from "../../components/Empty";
import Loading from "../../components/Loading";
import type { IRequestForAttestation } from "@kiltprotocol/sdk-js";

import "./index.scss";

const data = [
  {
    claimer: "lixin",
    ctype: "zcloak",
    status: "pending",
    time: "2021-12-02 17:34:53",
  },
  {
    claimer: "lixin2",
    ctype: "zcloak",
    status: "pending",
    time: "2021-12-02 17:34:53",
  },
];

const STATUS = ["Pending", "processed"];

const Option = Select.Option;

const detail = {
  claim: {
    cTypeHash: "oxxxxxx",
    contents: {
      age: 22,
    },
    owner: "oxxxxxxxxx",
  },
};

const Content: React.FC = () => {
  const [message, setMessage] = useState(null);
  const [selectItem, setSelectItem] = useState<any>();
  const toggleModal = useToggleDetailModal();
  const currIdentity = useGetCurrIdentity();
  const [loading, setLoading] = useState(false);
  const handleTypeChange = () => {};
  const keystore = new Kilt.Did.DemoKeystore();

  const handleClick = (data) => {
    setSelectItem(data);
    toggleModal();
  };
  const queryMessage = async () => {
    if (currIdentity.fullDid.did) {
      await setLoading(true);
      const res = await getMessage({ receiver: currIdentity.fullDid.did });
      if (res.data.code === 200) {
        await setMessage(res.data.data);
        await setLoading(false);
      }
    }
  };

  useEffect(() => {
    queryMessage();
  }, []);
  console.log(5454, selectItem);

  const handleSubmit = async () => {
    // /* Therefore, **during decryption** both the **sender account and the validity of the message are checked automatically**. */
    // const decrypted = await Kilt.Message.decrypt(encryptedMessage, keystore)
    // /* At this point the Attester has the original request for attestation object: */
    if (selectItem.body.type === Kilt.Message.BodyType.REQUEST_ATTESTATION) {
      const extractedRequestForAttestation: IRequestForAttestation =
        selectItem.body.content.requestForAttestation;
      // //   /* The Attester creates the attestation based on the IRequestForAttestation object she received: */
      const attestation = Kilt.Attestation.fromRequestAndDid(
        extractedRequestForAttestation,
        currIdentity.fullDid.did
      );
      // //   /* The complete `attestation` object looks as follows: */
      // console.log(attestation);
      // //   /* Now the Attester can store and authorize the attestation on the blockchain, which also costs tokens: */
      // const tx = await attestation.store();
      const didResolver = await getFullDid(currIdentity.fullDid.did);
      // const authorizedTx = await didResolver.authorizeExtrinsic(
      //   tx,
      //   keystore,
      //   currIdentity.account.address
      // );

      // await Kilt.BlockchainUtils.signAndSubmitTx(
      //   authorizedTx,
      //   currIdentity.account,
      //   {
      //     resolveOn: Kilt.BlockchainUtils.IS_IN_BLOCK,
      //     reSign: true,
      //   }
      // );
      // //   /* The request for attestation is fulfilled with the attestation, but it needs to be combined into the `Credential` object before sending it back to the Claimer: */
      // const credential = Kilt.Credential.fromRequestAndAttestation(
      //   extractedRequestForAttestation,
      //   attestation
      // );
      // //   /* The complete `credential` object looks as follows: */
      // console.log(credential);
      // //   /* The Attester has to send the `credential` object back to the Claimer in the following message: */
      // const messageBodyBack: MessageBody = {
      //   content: credential,
      //   type: Kilt.Message.BodyType.SUBMIT_ATTESTATION,
      // };
      // const messageBack = new Kilt.Message(
      //   messageBodyBack,
      //   attesterFullDid.did,
      //   claimerLightDid.did
      // );
    }
    //   /* The complete `messageBack` message then looks as follows: */
    //   console.log(messageBack)

    // store attestation locally
  };

  return (
    <div className="attester-content">
      {message && message.length > 0 && !loading && (
        <>
          {" "}
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
            {message.map((it, index) => (
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
        handleSubmit={handleSubmit}
      />
      {loading && <Loading />}
    </div>
  );
};
export default Content;
