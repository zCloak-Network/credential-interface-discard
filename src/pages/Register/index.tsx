/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 10:45:21
 * @LastEditTime: 2022-03-17 19:11:54
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
  useSaveIdentity,
  useSavePassword,
  useSaveCurrIdentity,
} from "../../state/wallet/hooks";
import * as Kilt from "@kiltprotocol/sdk-js";
import {
  getSigningKeypair,
  getEncryptionKeypair,
  getLightDid,
} from "../../utils/accountUtils";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

import "./index.scss";

const keyPairType = "ed25519";

const getStepItem = (num, className) => {
  const klasses = classNames("register-step-icon", className);

  return (
    <div className={klasses}>
      <span>{num}</span>
    </div>
  );
};

const RegisterSteps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const saveIdentity = useSaveIdentity();
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

  const handleCreate = (values) => {
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
    const keyring = new Kilt.Utils.Keyring({
      ss58Format: 38,
      type: keyPairType,
    });
    const account = keyring.addFromMnemonic(oldMnemonic);
    console.log(account, `KILT address: ${account.address}`);

    const signingKeypair = await getSigningKeypair(oldMnemonic);
    const encryptionKeypair = await getEncryptionKeypair(oldMnemonic);

    // Create a light DID from the generated authentication key.
    const lightDid = getLightDid(signingKeypair, encryptionKeypair);

    // const fullDid = getFullDid(account, oldMnemonic);
    // console.log(121212000, fullDid);

    const newIdentity = {
      account,
      keypairType: keyPairType,
      oldMnemonic,
      signingKeypair,
      encryptionKeypair,
      lightDid,
    };

    console.log(121212, newIdentity);
    await register();
    await saveCurrIdentity(newIdentity);
    await savePassword(password);
    await saveIdentity(newIdentity);

    await navigate("/user");
  };

  const FirstRegisterSteps = [
    {
      description: "Create Password",
      content: <CreatePassword handleClick={handleCreate} />,
    },
    {
      description: "Recovery Phrase",
      content: <Recovery handleClick={handleRecovery} mnemonic={mnemonic} />,
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
