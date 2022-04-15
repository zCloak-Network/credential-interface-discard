/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-11 10:53:01
 * @LastEditTime: 2022-04-14 16:52:42
 */
import React, { useState, useMemo, useEffect } from "react";
import { useAddPopup } from "../../state/application/hooks";
import { shortenHash } from "../../utils";
import { getContract } from "../../utils/web3Utils";
import Button from "../../components/Button";
import abi from "../../constants/contract/contractAbi/KiltProofs";
import { KiltProofsAdddress as contractAddress } from "../../constants/contract/address";
import { useToggleGuideRule } from "../../state/application/hooks";
import { MESSAGECODE } from "../../constants/guide";

import "./FifthStepSubmit.scss";

type Props = {
  account: string;
  proName: string;
  cTypeName: string;
  cTypeHash: string;
  proHash: string;
  fieldName: string;
  programDetail: string;
};

const FifthStepSubmit: React.FC<Props> = ({
  account,
  cTypeHash,
  cTypeName,
  fieldName,
  proHash,
  proName,
  programDetail,
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
    setStatus("extensionNext");
  };

  // const STATUS = {
  //   submit: {
  //     buttonText: "Import Credential",
  //     buttonType: null,
  //     func: handleSbumit,
  //     message: null,
  //     messageType: null,
  //   },
  //   extensionImport: {
  //     buttonText: "loading",
  //     buttonType: "loading",
  //     func: null,
  //     message: "Please select the Credential file and Import it",
  //     messageType: "warning",
  //   },
  //   next: {
  //     buttonText: "Next",
  //     buttonType: null,
  //     func: handleNext,
  //     message: null,
  //     messageType: null,
  //   },
  // };

  const handleSumbit = () => {
    setLoading(true);
    const contract = getContract(abi, contractAddress);
    contract.methods
      .addProof(
        "0xf85edd58bd7de60dac41894c508a1522f86d4b1066e3a4cbea3ab0353e659d55",
        cTypeHash,
        fieldName,
        proHash,
        generationInfo.proofCid,
        generationInfo.rootHash,
        generationInfo.expectResult
      )
      .send({
        from: account,
      })
      .then(function (receipt) {
        console.log("addProofReceipt", receipt);
        if (receipt) {
          setLoading(false);

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
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { statusCode, data } = event.data;

      if (statusCode === MESSAGECODE.EXTENSION_CLOSED) {
        setGenerateLoading(false);
      }

      if (statusCode === MESSAGECODE.SEND_PROOF_TO_WEB && data.proofCid) {
        setGenerationInfo({
          proofCid: data.proofCid,
          rootHash: data.rootHash,
          expectResult: data.expectResult.join(),
        });
        setStatus("extensionCreate");
      }

      if (
        statusCode === MESSAGECODE.SEND_CREATE_PASSWORD_SUCCESS_TO_WEB &&
        data.createPassword
      ) {
        setStatus("next");
      }
    });
  }, []);

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
