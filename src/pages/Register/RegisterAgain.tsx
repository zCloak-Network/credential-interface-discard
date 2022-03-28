/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 10:45:21
 * @LastEditTime: 2022-03-28 22:01:53
 */
import React, { useState, useEffect } from "react";
import LogoBanner from "../../components/LogoBanner";
import { Steps } from "antd";
import classNames from "classnames";
import ComfirmPassword from "./ComfirmPassword";
import Recovery from "./Recovery";
import Confirm from "./Confirm";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { useSaveClaimer, useSaveAttester } from "../../state/wallet/hooks";
import * as Kilt from "@kiltprotocol/sdk-js";
import {
  generateAccount,
  generateLightDid,
  generateLightKeypairs,
} from "../../utils/accountUtils";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

const { Step } = Steps;

import "./index.scss";

const getStepItem = (num, className) => {
  const klasses = classNames("register-step-icon", className);

  return (
    <div className={klasses}>
      <span>{num}</span>
    </div>
  );
};

type Props = {
  password: string;
};

const RegisterAgain: React.FC<Props> = ({ password }) => {
  const navigate = useNavigate();
  const isClaimer = useRole();
  const saveClaimer = useSaveClaimer();
  const saveAttester = useSaveAttester();
  // const saveCurrIdentity = useSaveCurrIdentity();
  const [current, setCurrent] = useState<number>(0);
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [oldMnemonic, setOldMnemonic] = useState<string>("");

  const handleCreate = async () => {
    await addIdentity();
    await handleBack();
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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

    // await saveCurrIdentity(newIdentity);
    if (isClaimer) {
      await saveClaimer(newIdentity);
    } else {
      await saveAttester(newIdentity);
    }
  };

  const handleBack = async () => {
    navigate(-1);
  };

  const FirstRegisterSteps = [
    {
      description: "Recovery Phrase",
      content: (
        <Recovery
          handleClick={() => {
            next();
          }}
          mnemonic={mnemonic}
          handleBack={handleBack}
        />
      ),
    },
    {
      description: "Confirm",
      content: (
        <Confirm
          mnemonic={mnemonic}
          handleClick={() => {
            next();
          }}
          handleBack={() => {
            prev();
          }}
        />
      ),
    },
    {
      description: "Create account",
      content: (
        <ComfirmPassword
          handleClick={handleCreate}
          password={password}
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
export default RegisterAgain;
