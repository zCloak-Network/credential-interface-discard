/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-11 10:53:01
 * @LastEditTime: 2022-04-21 11:39:30
 */
import React, { useState, useMemo, useEffect } from "react";
import { useAddPopup } from "../../state/application/hooks";
import { shortenHash, hexToInt10 } from "../../utils";
import { getContract } from "../../utils/web3Utils";
import Button from "../../components/Button";
import abi from "../../constants/contract/contractAbi/KiltProofs";
import { KiltProofsAdddress as contractAddress } from "../../constants/contract/address";
import { useToggleGuideRule } from "../../state/application/hooks";
import { MESSAGECODE, ADMINATTESTERADDRESS } from "../../constants/guide";
import { u8aToHex, stringToHex } from "@polkadot/util";
import { decodeAddress } from "@polkadot/keyring";
import { GUIDEACCOUNT } from "../../constants/guide";
import { openMessage, destroyMessage } from "../../utils/message";

import "./FifthStepSubmit.scss";

const messageKey = "uploadProof";

type Props = {
  account: string;
  proName: string;
  cTypeName: string;
  cTypeHash: string;
  proHash: string;
  fieldName: string;
  programDetail: string;
  handleNext: () => void;
};

const FifthStepSubmit: React.FC<Props> = ({
  account,
  cTypeHash,
  cTypeName,
  fieldName,
  proHash,
  proName,
  programDetail,
  handleNext,
}) => {
  const [loading, setLoading] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [status, setStatus] = useState("submit");
  const [generationInfo, setGenerationInfo] = useState({
    proofCid: "",
    rootHash: "",
    expectResult: "",
  });
  const addPopup = useAddPopup();
  const toggleModal = useToggleGuideRule();

  const openExtension = async () => {
    const { openzkIDPopup } = window?.zCloak?.zkID;
    setGenerateLoading(true);
    const data = STATUS.enterPassword;
    openMessage(data.message, data.messageType, messageKey);

    openzkIDPopup(
      "OPEN_GENERATE_PROOF",
      // 可选参数
      {
        cTypeHash: cTypeHash,
        programHashName: proName,
        programFieldName: fieldName,
        programHash: proHash,
        programDetail: programDetail,
      }
    );
  };

  const STATUS = {
    submit: {
      buttonText: "Submit",
      buttonType: null,
      func: null,
      message: "Please click the Generate button to open the extension",
      messageType: "warning",
    },
    enterPassword: {
      buttonText: "",
      buttonType: "",
      func: null,
      message: "Please enter the password in the extension",
      messageType: "warning",
    },
    // next: {
    //   buttonText: "Next",
    //   buttonType: null,
    //   func: handleNext,
    //   message: null,
    //   messageType: null,
    // },
  };

  const handleSumbit = () => {
    setLoading(true);
    const localAccount = JSON.parse(localStorage.getItem(GUIDEACCOUNT));
    if (localAccount) {
      const formatUserAddress = u8aToHex(
        decodeAddress(localAccount?.account?.address)
      );
      const formatAttesterAddress = u8aToHex(
        decodeAddress(ADMINATTESTERADDRESS)
      );
      const formatField = fieldName
        .split(",")
        .map((it) => hexToInt10(stringToHex(it).substring(2)));
      const contract = getContract(abi, contractAddress);

      contract.methods
        .addProof(
          formatUserAddress,
          formatAttesterAddress, //attester
          cTypeHash,
          formatField,
          proHash,
          generationInfo.proofCid,
          generationInfo.rootHash,
          [generationInfo.expectResult] // [generationInfo.expectResult]
        )
        .send({
          from: account,
        })
        .then(function (receipt) {
          console.log("addProofReceipt", receipt);
          if (receipt) {
            setLoading(false);
            handleNext();
            addPopup(
              {
                txn: {
                  hash: receipt.transactionHash,
                  success: true,
                  title: "Submit Success",
                  summary: "You have submitted successfully.",
                },
              },
              receipt.transactionHash
            );
          }
        });
    }
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { statusCode, data } = event.data;

      if (statusCode === MESSAGECODE.EXTENSION_CLOSED) {
        setGenerateLoading(false);
        if (generationInfo.proofCid) {
          destroyMessage(messageKey);
        }
      }

      if (statusCode === MESSAGECODE.SEND_PROOF_TO_WEB && data.proofCid) {
        setGenerationInfo({
          proofCid: data.proofCid,
          rootHash: data.rootHash,
          expectResult: data.expectResult,
        });
        destroyMessage(messageKey);
        setGenerateLoading(false);
      }
    });
  }, [generationInfo]);

  useEffect(() => {
    if (!generationInfo.proofCid) {
      const data = STATUS[status];
      openMessage(data.message, data.messageType, messageKey);
    } else {
      destroyMessage(messageKey);
    }
  }, [generationInfo]);

  const abled = useMemo(
    () => proName && proHash && fieldName && generationInfo.proofCid,
    [proName, proHash, fieldName, generationInfo.proofCid]
  );

  return (
    <div className="upload-proof-submit">
      <div className="item program">
        <div className="label">zk Program</div>
        <div className="value">
          <span
            className="program-name"
            onClick={() => {
              toggleModal();
            }}
          >
            {proName}
          </span>
          <span>{shortenHash(proHash)}</span>
        </div>
      </div>
      <div className="item">
        <div className="label">Credential type</div>
        <div className="value">
          <span>{cTypeName}</span>
        </div>
      </div>
      <div className="item">
        <div className="label">filed name</div>
        <div className="value">
          <span>{fieldName}</span>
        </div>
      </div>
      <div className="item generate-item">
        <div className="label">outputs,rootHash,proof cid</div>
        <div className="value">
          {generationInfo.proofCid && (
            <span>
              {generationInfo.expectResult};
              {shortenHash(generationInfo.rootHash)};
              {shortenHash(generationInfo.proofCid)}
            </span>
          )}
          <Button
            size="default"
            className="generate-btn"
            onClick={openExtension}
            loading={generateLoading}
          >
            Generate
          </Button>
        </div>
      </div>
      <Button
        size="default"
        disabled={!abled}
        className="btn"
        type="primary"
        onClick={handleSumbit}
        loading={loading}
      >
        Submit
      </Button>
    </div>
  );
};
export default FifthStepSubmit;
