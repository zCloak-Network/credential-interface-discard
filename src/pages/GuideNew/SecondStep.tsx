/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 16:22:45
 * @LastEditTime: 2022-04-13 11:43:00
 */
import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import dayjs from "dayjs";
import { Form, Input, message, DatePicker, Select } from "antd";
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
import { getRandom, getAge } from "../../utils";
import { credentialClass, ADMINATTESTER, CTYPE } from "../../constants/guide";
import { useAddPopup } from "../../state/application/hooks";
import type { MessageBody } from "@kiltprotocol/sdk-js";
import { CTypeSchemaWithoutId } from "@kiltprotocol/types";
import SecondStepCredential from "./SecondStepCredential";
import classNames from "classnames";

const { Option } = Select;

const GUIDEACCOUNT = "zCloakGuideAccount";
const GUIDECLAIM = "zCloakGuideClaim";

enum status {
  notAttested = 1,
  attesting = 2,
  attested = 3,
}

const TIME = 6000;

type Props = {
  handleNext: () => void;
  handleCredentail: (data) => void;
};

const SecondStep: React.FC<Props> = ({ handleNext, handleCredentail }) => {
  const [form] = Form.useForm();
  const addPopup = useAddPopup();
  const toggleModal = useToggleGuideMessage();
  const [credentail, setCredentail] = useState<any>();
  const [next, setNext] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [random, seRandom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<any>();
  const [interval, setInterval] = useState(TIME);
  const [attestationStatus, setAttestationStatus] = useState<status>();

  // request attestation
  const requestAttestation = async (data) => {
    try {
      await Kilt.init({ address: WSSURL });

      const keystoreClaimer = new Kilt.Did.DemoKeystore();
      const keystoreAttester = new Kilt.Did.DemoKeystore();
      const receiverFullDid = await getFullDid(
        Kilt.Did.DidUtils.getIdentifierFromKiltDid(ADMINATTESTER)
      );
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
        lightDid.encryptionKey!.id,
        lightDid,
        keystoreAttester,
        receiverFullDid.assembleKeyId(receiverFullDid.encryptionKey!.id)
      );
      const res = await submitClaim({ ...encryptedPresentationMessage });
      if (res.data.code === 200) {
        setInterval(TIME);
      }
    } catch (error) {
      addPopup({
        txn: {
          hash: "",
          success: false,
          title: error.name,
          summary: error.message,
        },
      });

      throw error;
    }
  };

  const onFinish = async (values: any) => {
    if (disabled && !random) return;
    await setLoading(true);
    await message.warning({
      content: "It may take you 30-60s",
      duration: 0,
    });
    console.log("Success:", values);
    const year = dayjs(values.age).get("year");
    const month = dayjs(values.age).get("month") + 1;
    const date = dayjs(values.age).get("date");

    const age = getAge(year, month, date);

    const newValues = {
      ...values,
      age: age,
    };

    await requestAttestation(newValues);
  };

  const handleDownload = async () => {
    const blob = await new Blob([JSON.stringify(credentail.body.content)], {
      type: "text/plain;charset=utf-8",
    });

    await FileSaver.saveAs(blob, "credential.json");
    await setNext(true);
  };

  const handleValuesChange = (_, allValues) => {
    const allTrue = Object.values(allValues).every((it) => !!it);

    setDisabled(!allTrue);
  };

  const saveAccount = async () => {
    // 助记词生成账户
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

    // kilt account存在本地
    localStorage.setItem(GUIDEACCOUNT, JSON.stringify(newIdentity));
    setAccount(newIdentity);
  };

  // init kilt account
  useEffect(() => {
    const localAccount = localStorage.getItem(GUIDEACCOUNT);
    if (localAccount) {
      setAccount(JSON.parse(localAccount));
    } else {
      saveAccount();
    }
  }, []);

  const decrypt = async (data) => {
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
    if (attestationStatus === status.attested) {
      const lightDid = Kilt.Did.LightDidDetails.fromUri(
        account.lightDidDetails.did
      );

      const res = await getAttestation({
        receiverKeyId: `${account?.lightDidDetails.did}#${
          lightDid.encryptionKey!.id
        }`,
      });

      if (res.data.code === 200) {
        const decryptData = await decrypt(res.data.data[0]);

        console.log(45555, decryptData);
        setCredentail(decryptData);
        handleCredentail(decryptData);
        await setLoading(false);
        await message.destroy();
      }
    }
  };

  useEffect(() => {
    queryAttestation();
  }, [attestationStatus]);

  const updateStatus = async () => {
    const lightDid = Kilt.Did.LightDidDetails.fromUri(
      account.lightDidDetails.did
    );
    const res = await getAttestationStatus({
      // senderKeyId: account.lightDidDetails.did,
      senderKeyId: `${account?.lightDidDetails.did}#${
        lightDid.encryptionKey!.id
      }`,
    });
    if (res.data.code === 200) {
      if (res.data.data.attestationStatus !== status.attesting) {
        setInterval(undefined);
      }
      setAttestationStatus(res.data.data.attestationStatus);
    } else {
      setInterval(undefined);
    }
  };

  const handleRandom = () => {
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
      updateStatus();
    }
  }, [account]);

  useEffect(() => {
    toggleModal();
  }, []);

  return (
    <div className="step-wrapper">
      <div className="title">Get credential</div>
      <div className="sub-title">
        Your wallet is used to derive private keys, which are used to encrypt
        your data and sign private transactions.
      </div>
      {!credentail && (
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
              <DatePicker placeholder="Please select a date" />
            </Form.Item>
            <Form.Item label="Class" name="class">
              <Select
                placeholder="Please select a class"
                dropdownClassName="credential-class-select"
              >
                {credentialClass.map((it) => (
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
              <Button className="random-btn" onClick={handleRandom}>
                Random
              </Button>
            </div>
            <Button
              size="default"
              className={classNames("btn", {
                "submit-loading-btn": loading,
              })}
              htmlType="submit"
              disabled={disabled && !random}
              loading={loading}
            >
              Submit
            </Button>
          </Form>
        </>
      )}
      {!!credentail && (
        <div>
          <SecondStepCredential data={credentail} />
          <div style={{ textAlign: "center" }}>
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
    </div>
  );
};
export default SecondStep;
