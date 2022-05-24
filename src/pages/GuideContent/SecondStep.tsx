/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-05-24 15:17:34
 */
import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Select } from "antd";
import Button from "../../components/Button";
import { Claim, CType } from "@kiltprotocol/sdk-js";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import * as Kilt from "@kiltprotocol/sdk-js";
import {
  getFullDid,
  generateAccount,
  generateLightDid,
  generateFullKeypairs,
  generateLightKeypairs,
} from "../../utils/accountUtils";
import {
  submitClaim,
  getAttestationStatus,
  getAttestation,
} from "../../services/api";
import { useInterval } from "ahooks";
import { useToggleGuideMessage } from "../../state/application/hooks";
import { WSSURL } from "../../constants";
import SecondStepModal from "./SecondStepModal";
import { getRandom, getAgeByBirth } from "../../utils";
import { CREDENTIAL_CLASS, ADMIN_ATTESTER, CTYPE } from "../../constants/guide";
import { useAddPopup } from "../../state/application/hooks";
import type { MessageBody } from "@kiltprotocol/sdk-js";
import SecondStepCredential from "./SecondStepCredential";
import classNames from "classnames";
import { openMessage, destroyMessage } from "../../utils/message";
import { GUIDE_DESC } from "../../constants/guide";
import Loading from "../../components/Loading";
import moment from "moment";
import {
  IDidDetails,
  KeyringPair,
  IEncryptedMessage,
  CTypeSchemaWithoutId,
  IClaimContents,
} from "@kiltprotocol/types";
import { GUIDE_ACCOUNT } from "../../constants/guide";
import { IContents } from "../../types/claim";

import { ICredential } from "./index";

const { Option } = Select;

enum AttestationStatus {
  notAttested = 1,
  attesting = 2,
  attested = 3,
  attestedFail = -1,
}

const TIME = 6000;

const messageKey = "getCredential";

interface IProps {
  handleNext: () => void;
  handleCredentail: (data: ICredential | null) => void;
}

interface IAccout {
  account: KeyringPair;
  mnemonic: string;
  lightDidDetails: IDidDetails;
}

const WAITING_MESSAGE =
  "We are checking your documents. The attestation takes 30-60s.";

const SecondStep: React.FC<IProps> = ({ handleNext, handleCredentail }) => {
  const [form] = Form.useForm();
  const addPopup = useAddPopup();
  const toggleModal = useToggleGuideMessage();
  const [credentail, setCredentail] = useState<ICredential>();
  const [next, setNext] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [random, seRandom] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [initRefesh, setInitRefesh] = useState<boolean>(true);
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<IAccout>();
  const [interval, setIntervalStatus] = useState<number | undefined>(TIME);
  const [attestationStatus, setAttestationStatus] =
    useState<AttestationStatus>();

  // request attestation
  const requestAttestation = async (data: IClaimContents) => {
    if (!account) return;

    try {
      await Kilt.init({ address: WSSURL });

      const keystoreClaimer = new Kilt.Did.DemoKeystore();
      const keystoreAttester = new Kilt.Did.DemoKeystore();

      const receiverFullDid = await getFullDid(
        Kilt.Did.DidUtils.getIdentifierFromKiltDid(ADMIN_ATTESTER)
      );

      if (!receiverFullDid || !receiverFullDid.encryptionKey) return;

      const ctype = CType.fromSchema(CTYPE as CTypeSchemaWithoutId);

      const claim = Claim.fromCTypeAndClaimContents(
        ctype,
        data,
        account?.lightDidDetails?.did
      );
      const requestForAttestation = Kilt.RequestForAttestation.fromClaim(claim);

      const lightKeypairs = await generateLightKeypairs(
        keystoreClaimer,
        account.mnemonic
      );
      const lightDid = await generateLightDid(lightKeypairs);
      if (!lightDid || !lightDid.encryptionKey) return;

      const messageBody: MessageBody = {
        content: { requestForAttestation },
        type: Kilt.Message.BodyType.REQUEST_ATTESTATION,
      };

      const message = new Kilt.Message(
        messageBody,
        account?.lightDidDetails?.did,
        receiverFullDid.did
      );

      await generateFullKeypairs(keystoreAttester, account.mnemonic);

      const encryptedPresentationMessage = await message.encrypt(
        lightDid.encryptionKey.id,
        lightDid,
        keystoreAttester,
        receiverFullDid.assembleKeyId(receiverFullDid.encryptionKey.id)
      );
      const res = await submitClaim({ ...encryptedPresentationMessage });
      if (res.data.code === 200) {
        setIntervalStatus(TIME);
      }
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

  const onFinish = async (values: IContents) => {
    if (disabled || !random) return;
    setLoading(true);
    openMessage(WAITING_MESSAGE, "warning", messageKey);

    const year = dayjs(values.age).get("year");
    const month = dayjs(values.age).get("month") + 1;
    const date = dayjs(values.age).get("date");

    const age = getAgeByBirth(year, month, date);

    const newValues = {
      ...values,
      age: age,
    };

    await requestAttestation(newValues);
  };

  const handleDownload = async () => {
    if (credentail) {
      const blob = await new Blob([JSON.stringify(credentail.body.content)], {
        type: "text/plain;charset=utf-8",
      });

      await FileSaver.saveAs(blob, "credential.json");
      await setNext(true);
    }
  };

  const handleValuesChange = (
    _: any,
    allValues: {
      [key: string]: any;
    }
  ) => {
    const checkLabel = ["name", "age", "class"];
    const allTrue = checkLabel.every((it) => !!allValues[it]);

    setDisabled(!allTrue);
  };

  const generateNewAccount = async () => {
    // Generate account by mnemonic
    const mnemonic = mnemonicGenerate();
    const account = await generateAccount(mnemonic);

    const keystore = new Kilt.Did.DemoKeystore();
    const lightKeypairs = await generateLightKeypairs(keystore, mnemonic);
    const lightDid = await generateLightDid(lightKeypairs);
    const newIdentity = {
      account,
      mnemonic: mnemonic,
      lightDidDetails: lightDid,
    };

    // kilt account
    localStorage.setItem(GUIDE_ACCOUNT, JSON.stringify(newIdentity));
    setAccount(newIdentity);
  };

  // init kilt account
  useEffect(() => {
    generateNewAccount();
  }, []);

  const decrypt = async (data: IEncryptedMessage) => {
    if (!account) return;

    const keystore = new Kilt.Did.DemoKeystore();
    const lightKeypairs = await generateLightKeypairs(
      keystore,
      account.mnemonic
    );
    const lightDid = await generateLightDid(lightKeypairs);

    const decryptedRequestForAttestationMessage = await Kilt.Message.decrypt(
      data,
      keystore,
      lightDid
    );

    return decryptedRequestForAttestationMessage;
  };

  const queryAttestation = async () => {
    if (!account) return;

    if (attestationStatus === AttestationStatus.attested) {
      const lightDid = Kilt.Did.LightDidDetails.fromUri(
        account.lightDidDetails.did
      );
      if (!lightDid || !lightDid.encryptionKey) return;

      const res = await getAttestation({
        receiverKeyId: `${account?.lightDidDetails.did}#${lightDid.encryptionKey.id}`,
      });

      if (res.data.code === 200) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decryptData = (await decrypt(res.data.data[0])) as any;

        setCredentail(decryptData);
        handleCredentail(decryptData);
        await setLoading(false);
        destroyMessage(messageKey);
        await setInitLoading(false);
      }
    }
  };

  useEffect(() => {
    queryAttestation();
  }, [attestationStatus]);

  const updateStatus = async () => {
    if (!account) return;

    const lightDid = Kilt.Did.LightDidDetails.fromUri(
      account.lightDidDetails.did
    );
    if (!lightDid || !lightDid.encryptionKey) return;

    const res = await getAttestationStatus({
      senderKeyId: `${account?.lightDidDetails.did}#${lightDid.encryptionKey.id}`,
    });
    if (res.data.code === 200) {
      if (res.data.data.attestationStatus === AttestationStatus.attestedFail) {
        addPopup({
          txn: {
            hash: "",
            success: false,
            title: "Attestation failed",
            summary: "Attestation failed, please resubmit.",
          },
        });

        setLoading(false);
      }

      // Only the interface will be called during validation
      if (res.data.data.attestationStatus !== AttestationStatus.attesting) {
        setIntervalStatus(undefined);
      }

      if (res.data.data.attestationStatus === AttestationStatus.notAttested) {
        await setInitLoading(false);
      }

      setAttestationStatus(res.data.data.attestationStatus);
    } else {
      setIntervalStatus(undefined);
    }
  };

  const disabledDate = (current: any) => {
    return current && current > moment().endOf("day");
  };

  const handleRandom = () => {
    if (loading) return;
    const helmet_rarity = getRandom();
    const chest_rarity = getRandom();
    const weapon_rarity = getRandom();
    form.setFieldsValue({ helmet_rarity, chest_rarity, weapon_rarity });
    seRandom(true);
  };

  useInterval(() => {
    if (account) {
      updateStatus();
    }
  }, interval);

  useEffect(() => {
    if (account) {
      if (initRefesh) {
        setInitRefesh(true);
        setInitLoading(true);
      }
      updateStatus();
    }

    return () => {
      destroyMessage(messageKey);
    };
  }, [account]);

  useEffect(() => {
    toggleModal();
  }, []);

  const hasCredentail = !!credentail;
  const currText = hasCredentail
    ? GUIDE_DESC.receiveCredential
    : GUIDE_DESC.describeYourself;

  return (
    <div className="step-wrapper">
      <div className="title">{currText.title}</div>
      <div className="sub-title">{currText.desc}</div>
      {!hasCredentail && !initLoading && (
        <>
          <Form
            name="basic"
            form={form}
            className="create-claim-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
            layout="vertical"
            onValuesChange={handleValuesChange}
          >
            <Form.Item label="Name" name="name">
              <Input placeholder="Please input name" />
            </Form.Item>
            <Form.Item label="Birthday" name="age">
              <DatePicker
                placeholder="Please select a date"
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item label="Class" name="class">
              <Select
                placeholder="Please select a class"
                dropdownClassName="credential-class-select"
              >
                {CREDENTIAL_CLASS.map((it) => (
                  <Option value={it.value} key={it.value}>
                    {it.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="equipment-label">Equipment Rarity</div>
            <div className="equipment">
              <Form.Item
                label="Helmet :"
                name="helmet_rarity"
                className="secondary-item"
              >
                <Input placeholder="1-10" disabled />
              </Form.Item>
              <Form.Item
                label="Chest :"
                name="chest_rarity"
                className="secondary-item"
              >
                <Input placeholder="1-10" disabled />
              </Form.Item>
              <Form.Item
                label="Weapon :"
                name="weapon_rarity"
                className="secondary-item"
              >
                <Input placeholder="1-10" disabled />
              </Form.Item>
              <Button
                className={classNames("random-btn", {
                  "random-btn-disabled": loading,
                })}
                onClick={handleRandom}
              >
                Random
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="default"
                className={classNames("btn", {
                  "submit-loading-btn": loading,
                })}
                htmlType="submit"
                disabled={disabled || !random}
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </>
      )}
      {hasCredentail && !initLoading && (
        <div>
          <SecondStepCredential data={credentail} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="btn" onClick={handleDownload}>
              Download
            </Button>
            <Button className="btn" disabled={!next} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
      <SecondStepModal />
      {initLoading && <Loading />}
    </div>
  );
};
export default SecondStep;
