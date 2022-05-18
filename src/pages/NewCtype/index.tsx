/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 14:49:25
 * @LastEditTime: 2022-05-18 14:44:45
 */
import React, { useState } from "react";
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
import { ICTypeSchema, InstanceType } from "@kiltprotocol/types";

import "./index.scss";

const MODOLE = [
  {
    title: "Attester",
    key: "attester",
    url: "/credential/attester/attestations",
  },
];

interface IProperties {
  title: string;
  type: InstanceType;
}

type ICTypeSchemaNew = ICTypeSchema & {
  properties: IProperties[];
};

const NewCtype: React.FC = () => {
  const navigate = useNavigate();
  const addPopup = useAddPopup();
  const currIdentity = useGetCurrIdentity();
  const [cType, setType] = useState<ICTypeSchemaNew | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [connected, setConnected] = useState<boolean>(false);

  const handleBack = () => {
    navigate("/credential/attester/attestations/ctypes");
  };

  const updateCType = (type: ICTypeSchemaNew, isValid: boolean): void => {
    setType(type);
    setIsValid(isValid);
  };

  // const connect = () => {
  // TODO: test unmount and host change
  // TODO: test error handling
  // const blockUi: BlockUi = FeedbackService.addBlockUi({
  //   headline: "Connecting to block chain",
  // });
  // setConnected(true);
  // blockUi.remove();
  // };

  // useEffect(() => {
  //   // connect();
  // }, []);

  // const cancel = () => {
  //   // const { history } = this.props
  //   // // TODO: goto CTYPE list or previous screen?
  //   // history.push('/cType')
  // };

  const format = () => {
    if (!cType) return;

    const newProperties: {
      [key: string]: {
        $ref?: string;
        type?: InstanceType;
        format?: string;
      };
    } = {};

    cType.properties?.forEach((it) => {
      newProperties[it.title] = { type: it.type };
    });

    const newData = {
      $schema: cType.$schema,
      title: cType.title,
      properties: newProperties,
      type: "object",
    };

    return newData;
  };

  // Promise<void>
  const submit = async () => {
    // Load Account
    if (!currIdentity || !currIdentity.fullDid) return;

    await setLoading(true);
    const account = await generateAccount(currIdentity.mnemonic);
    const fullDid = await getFullDid(currIdentity.fullDid.identifier);
    // Load DID
    const keystore = new Kilt.Did.DemoKeystore();
    await generateFullKeypairs(keystore, currIdentity.mnemonic);

    try {
      const ctype = Kilt.CType.fromSchema(
        format() as ICTypeSchema,
        currIdentity.fullDid.did
      );

      const isStored = await ctype.verifyStored();
      if (isStored) {
        console.log("Ctype already stored. Skipping creation");
        return ctype;
      }

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
          summary: `CTYPE ${cType?.title} successfully created.`,
        },
      });
      await addCtype({
        owner: ctype.owner,
        ctypeHash: ctype.hash,
        metadata: ctype.schema,
      });
      await setLoading(false);
      await handleBack();
    } catch (error) {
      if (error instanceof Error) {
        addPopup({
          txn: {
            hash: "",
            success: false,
            title: `Failed to create CTYPE ${cType?.title}.`,
            summary: error.message,
          },
        });
      }

      await setLoading(false);
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
              alt="back"
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
