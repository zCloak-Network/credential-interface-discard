/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-11 10:53:01
 * @LastEditTime: 2022-04-12 23:01:20
 */
import React, { useState, useMemo } from "react";
import { useAddPopup } from "../../state/application/hooks";
import { shortenHash } from "../../utils";
import { getContract } from "../../utils/web3Utils";
import Button from "../../components/Button";
import abi from "../../constants/contract/contractAbi/KiltProofs";
import { KiltProofsAdddress as contractAddress } from "../../constants/contract/address";
import { useToggleGuideRule } from "../../state/application/hooks";

import "./FifthStepSubmit.scss";

type Props = {
  account: string;
  proName: string;
  cTypeHash: string;
  proHash: string;
  fieldName: string;
  programDetail: string;
};

const FifthStepSubmit: React.FC<Props> = ({
  account,
  cTypeHash,
  fieldName,
  proHash,
  proName,
  programDetail,
}) => {
  const [loading, setLoading] = useState(false);
  const [generationInfo, setGenerationInfo] = useState({
    proofCid: "",
    rootHash: "",
    expectResult: "",
  });
  const addPopup = useAddPopup();
  const toggleModal = useToggleGuideRule();

  const handleData = (event) => {
    if (event.data.type === "PROOF_DETAILS") {
      setGenerationInfo(event.data.data);
    }
  };

  window.addEventListener("message", handleData, true);

  const goToGenerate = () => {
    window.postMessage(
      {
        type: "OPEN_GENERATE",
        data: {
          cTypeHash: cTypeHash,
          programHashName: proName,
          programFieldName: fieldName,
          programHash: proHash,
          programDetail: programDetail,
          website: "",
        },
      },
      //TODO  改为apps网址
      "*"
    );
  };
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
        Boolean(Number(generationInfo.expectResult))
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
          <span>{shortenHash(cTypeHash)}</span>
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
          <Button className="generate-btn" onClick={goToGenerate}>
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
