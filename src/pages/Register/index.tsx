/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 10:45:21
 * @LastEditTime: 2022-05-12 18:32:29
 */
import React, { useState, useEffect } from "react";
import LogoBanner from "../../components/LogoBanner";
import { Steps } from "antd";
import classNames from "classnames";
import CreatePassword from "./CreatePassword";
import Recovery from "./Recovery";
import Confirm from "./Confirm";
import { PersistentStore } from "../../state/PersistentStore";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import {
  useSaveClaimer,
  useSaveAttester,
  useSavePassword,
  useSaveCurrIdentity,
} from "../../state/wallet/hooks";
import * as Kilt from "@kiltprotocol/sdk-js";
import {
  generateAccount,
  generateLightDid,
  generateLightKeypairs,
} from "../../utils/accountUtils";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

import "./index.scss";

const { Step } = Steps;

const getStepItem = (num: number, className: string) => {
  const klasses = classNames("register-step-icon", className);

  return (
    <div className={klasses}>
      <span>{num}</span>
    </div>
  );
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const isClaimer = useRole();
  const saveClaimer = useSaveClaimer();
  const saveAttester = useSaveAttester();
  const savePassword = useSavePassword();
  const saveCurrIdentity = useSaveCurrIdentity();
  const [password, setPassword] = useState<string>("");
  const [current, setCurrent] = useState<number>(0);
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [oldMnemonic, setOldMnemonic] = useState<string>("");

  const register = async (): Promise<void> => {
    PersistentStore.createSalt();
    await PersistentStore.createLocalState(password);
  };

  const handleCreate = (values: { password: string }) => {
    next();
    setPassword(values.password);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleRecovery = () => {
    next();
  };

  const addIdentity = async (): Promise<void> => {
    const account = await generateAccount(oldMnemonic);

    const keystore = new Kilt.Did.DemoKeystore();

    const lightKeypairs = await generateLightKeypairs(keystore, oldMnemonic);
    const lightDid = await generateLightDid(lightKeypairs);

    const newIdentity = {
      account,
      // keypairType: keyPairType,
      mnemonic: oldMnemonic,
      // signingKeypair,
      // encryptionKeypair,
      lightDidDetails: lightDid,
    };

    await register();
    await saveCurrIdentity(newIdentity);
    await savePassword(password);
    if (isClaimer) {
      await saveClaimer(newIdentity);
      await navigate("/credential/user/claims");
    } else {
      await saveAttester(newIdentity);
      await navigate("/credential/attester/attestations");
    }
  };

  const FirstRegisterSteps = [
    {
      description: "Create Password",
      content: <CreatePassword handleClick={handleCreate} />,
    },
    {
      description: "Recovery Phrase",
      content: (
        <Recovery
          handleClick={handleRecovery}
          mnemonic={mnemonic}
          backDisabled={true}
        />
      ),
    },
    {
      description: "Confirm",
      content: (
        <Confirm
          mnemonic={mnemonic}
          handleClick={addIdentity}
          handleBack={() => {
            prev();
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    const mnemonic = mnemonicGenerate();
    setOldMnemonic(mnemonic);

    setMnemonic(mnemonic.split(" "));
  }, []);

  return (
    <div className="register-main">
      <LogoBanner />
      <div className="register-content">
        <div className="title">Create A New Account</div>
        <Steps
          current={current}
          labelPlacement="vertical"
          className="register-step"
        >
          {FirstRegisterSteps.map((it, index) => {
            let cla = "";
            if (index === current) {
              cla = "curr";
            } else if (index > current) {
              cla = "next";
            } else {
              cla = "prev";
            }

            return (
              <Step
                description={it.description}
                icon={getStepItem(index + 1, cla)}
                key={index}
              />
            );
          })}
        </Steps>
        <div className="steps-content">
          {FirstRegisterSteps[current].content}
        </div>
      </div>
    </div>
  );
};
export default Register;
