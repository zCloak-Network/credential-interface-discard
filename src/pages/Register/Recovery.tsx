/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-09 17:13:19
 * @LastEditTime: 2022-03-25 15:05:05
 */
import React, { useState } from "react";
import BackBtn from "./BackBtn";
import Button from "../../components/Button";
import classNames from "classnames";

import "./Recovery.scss";

type Props = {
  handleBack?: () => void;
  handleClick: () => void;
  mnemonic: string[];
  backDisabled?: boolean;
};

const Recovery: React.FC<Props> = ({
  mnemonic,
  handleClick,
  handleBack,
  backDisabled = false,
}) => {
  const [status, setStatus] = useState(true);

  return (
    <div className="recovery">
      <div className="tip">
        Please write down your secret recovery phrase and keep it in a safe
        place. Never give this phrase to anyone as it will hand over control of
        your assets!
      </div>
      <div className="mnemonic-wrapper">
        <div
          className={classNames("mnemonic", {
            blur: status,
          })}
        >
          {mnemonic.map((it, index) => (
            <div key={index} className="mne-item">
              <span className="mne-index">{index + 1}.</span>
              <span className="mne-word">{it}</span>
            </div>
          ))}
        </div>
        {status && (
          <Button
            className="reveal-btn"
            type="primary"
            onClick={() => {
              setStatus(false);
            }}
          >
            <i className="iconfont icon_visible"></i>Reveal Seed Phrase
          </Button>
        )}
      </div>

      <div className="footer">
        <BackBtn disabled={backDisabled} onClick={handleBack} />
        <Button className="create-btn" type="primary" onClick={handleClick}>
          Confirm Seed Phrase
        </Button>
      </div>
    </div>
  );
};
export default Recovery;
