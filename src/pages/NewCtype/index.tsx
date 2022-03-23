/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 14:49:25
 * @LastEditTime: 2022-03-23 21:35:11
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CTypeEditor from "../../components/CtypeEditor";
import * as Kilt from "@kiltprotocol/sdk-js";
import { addCtype } from "../../services/api";
import ContentLayout from "../../components/ContentLayout";
import {
  getFullDid,
  generateAccount,
  generateFullKeypairs,
} from "../../utils/accountUtils";
import Button from "../../components/Button";
import { useGetCurrIdentity } from "../../state/wallet/hooks";
import { useAddPopup } from "../../state/application/hooks";
import arrowDownInactiveImg from "../../images/icon_arrow_inactive.png";

import "./index.scss";

type Props = {
  // input
  connected: boolean;
  cType: string;
  isValid: boolean;
  // output
  cancel: () => void;
  submit: () => void;
  updateCType: (cType: any, isValid: boolean) => void;
};

const MODOLE = [
  {
    title: "Attester",
    key: "attester",
    url: "/attester",
  },
];

const NewCtype: React.FC = () => {
  const navigate = useNavigate();
  const addPopup = useAddPopup();
  const currIdentity = useGetCurrIdentity();
  const [cType, setType] = useState<any>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [connected, setConnected] = useState<boolean>(false);

  const handleBack = () => {
    navigate("/attester/ctypes");
  };

  const updateCType = (type: string, isValid: boolean): void => {
    setType(type);
    setIsValid(isValid);
  };

  const connect = () => {
    // TODO: test unmount and host change
    // TODO: test error handling
    // const blockUi: BlockUi = FeedbackService.addBlockUi({
    //   headline: "Connecting to block chain",
    // });
    // setConnected(true);
    // blockUi.remove();
  };

  // useEffect(() => {
  //   // connect();
  // }, []);

  const cancel = () => {
    // const { history } = this.props
    // // TODO: goto CTYPE list or previous screen?
    // history.push('/cType')
  };

  const format = () => {
    const newProperties = {};
    cType.properties?.forEach((it) => {
      newProperties[it.title] = { type: it.type };
    });

    const newData = {
      ...cType,
      properties: newProperties,
    };

    return newData;
  };

  // Promise<void>
  const submit = async () => {
    // Load Account
    await setLoading(true);
    const account = await generateAccount(currIdentity.mnemonic);
    const fullDid = await getFullDid(currIdentity.fullDid.identifier);
    // Load DID
    const keystore = new Kilt.Did.DemoKeystore();
    await generateFullKeypairs(keystore, currIdentity.mnemonic);
    console.log(4545454, format());
    // get the CTYPE and see if it's stored, if yes return it
    const ctype = Kilt.CType.fromSchema(format());

    const isStored = await ctype.verifyStored();
    if (isStored) {
      console.log("Ctype already stored. Skipping creation");
      return ctype;
    }

    // authorize the extrinsic
    try {
      const tx = await ctype.getStoreTx();
      const extrinsic = await fullDid.authorizeExtrinsic(
        tx,
        keystore,
        account.address
      );
      // write to chain then return ctype
      await Kilt.BlockchainUtils.signAndSubmitTx(extrinsic, account, {
        resolveOn: Kilt.BlockchainUtils.IS_FINALIZED,
        reSign: true,
      });
      await addPopup({
        txn: {
          hash: "",
          success: true,
          title: "SUCCESS",
          summary: `CTYPE ${cType.title} successfully created.`,
        },
      });
      await addCtype({
        ctypeHash: ctype.hash,
        metadata: ctype.schema,
      });
      await setLoading(false);
      await handleBack();
    } catch (error) {
      throw error;
    }
  };

  return (
    <ContentLayout menu={MODOLE}>
      <div className="new-ctype">
        <div className="new-ctype-header">
          <div className="header-back-title">
            <img
              src={arrowDownInactiveImg}
              className="back-btn"
              onClick={handleBack}
            />
            Claimer
          </div>
        </div>
        <div className="header-title"> Create CTYPE</div>
        <CTypeEditor
          cType={cType}
          updateCType={updateCType}
          submit={submit}
          // cancel={cancel}
          // connected={connected}
          isValid={isValid}
        />
        <div className="actions">
          <Button
            type="button"
            className="submit-cType"
            disabled={!isValid}
            onClick={submit}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default NewCtype;
