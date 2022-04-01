/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 14:42:05
 * @LastEditTime: 2022-04-01 18:23:45
 */
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Button from "../../components/Button";
import { useGetClaims } from "../../state/claim/hooks";
import { useGetClaimers } from "../../state/wallet/hooks";
import { useToggleCreateClaimModal } from "../../state/application/hooks";
import DetailModal from "../DetailModal";
import RequestAttestationModal from "../RequestAttestationModal";
import Empty from "../../components/Empty";
import ContentLayout from "../../components/ContentLayout";
import * as Kilt from "@kiltprotocol/sdk-js";
import { getAttestation } from "../../services/api";
import {
  generateLightKeypairs,
  generateLightDid,
} from "../../utils/accountUtils";
import { useNavigate } from "react-router-dom";
import { useGetCurrIdentity } from "../../state/wallet/hooks";

import "./index.scss";

const MODOLE = [
  {
    title: "User",
    key: "user",
    url: "/user/claims",
  },
];

export default function Claimer(): JSX.Element {
  const allClaims = useGetClaims();
  const claimers = useGetClaimers();
  const currAccount = useGetCurrIdentity();
  const [attestationLoading, setAttestationLoading] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState();
  const [attestations, setAttestations] = useState([]);
  const toggleConnectWalletModal = useToggleCreateClaimModal();
  const navigate = useNavigate();

  const handleCreateClaim = () => {
    toggleConnectWalletModal();
  };

  const decryptAttestation = async (data) => {
    const dataAll = [];

    await data.map((it) => {
      dataAll.push(decrypt(it));
    });

    return Promise.all(dataAll).then((res) => {
      return res;
    });
  };

  const decrypt = async (data) => {
    const keystore = new Kilt.Did.DemoKeystore();
    const lightKeypairs = await generateLightKeypairs(
      keystore,
      currAccount.mnemonic
    );
    const lightDid = await generateLightDid(lightKeypairs);

    const decryptedRequestForAttestationMessage = await Kilt.Message.decrypt(
      data,
      keystore,
      lightDid
    );

    return decryptedRequestForAttestationMessage;
  };

  const queryAttestations = async () => {
    await setAttestationLoading(true);
    const lightDid = Kilt.Did.LightDidDetails.fromUri(
      currAccount.lightDidDetails.did
    );

    const res = await getAttestation({
      receiverKeyId: `${currAccount?.lightDidDetails.did}#${
        lightDid.encryptionKey!.id
      }`,
    });

    if (res.data.code === 200) {
      const decryptAttestations = await decryptAttestation(res.data.data);

      await setAttestations(decryptAttestations);
      await setAttestationLoading(false);
    }
  };

  useEffect(() => {
    if (currAccount && currAccount.mnemonic) {
      queryAttestations();
    }
  }, [currAccount]);

  const data = allClaims.filter(
    (it) => it?.claim.owner === currAccount?.lightDidDetails?.did
  );

  const handleCreateAccount = () => {
    navigate("/user/register-again");
  };

  if (claimers.length === 0) {
    return (
      <Empty
        description={
          <Button
            onClick={handleCreateAccount}
            type="primary"
            style={{ width: "450px", height: "40px" }}
          >
            Create A New Account
          </Button>
        }
      ></Empty>
    );
  }

  return (
    <ContentLayout menu={MODOLE}>
      <>
        <div className="claimer-lists">
          <div className="claimer-lists-header">
            <Button
              className="create-claim-btn"
              type="primary"
              onClick={handleCreateClaim}
            >
              Create Claim
            </Button>
          </div>
          {data && data.length > 0 && (
            <>
              <div className="claimer-lists-content-wrapper">
                <div className="claimer-content-header">
                  <span />
                  <span>Claim alias</span>
                  <span>Claim hash</span>
                  <span>Ctype hash</span>
                  <span>Attested</span>
                  <span>Time</span>
                  <span />
                </div>
                {data?.map((item, index) => {
                  const attestation = attestations.find(
                    (it) =>
                      it?.body?.content?.attestation?.cTypeHash ==
                      item.claim?.cTypeHash
                  );

                  return (
                    <div key={`${item.id}-${index}`} className="claimer-list">
                      <ListItem
                        data={item}
                        attestationLoading={attestationLoading}
                        attestation={attestation}
                        index={index + 1}
                        setSelectItem={(value) => {
                          setSelectItem(value);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {data && data.length === 0 && (
            <Empty description="Your claim will appear here." />
          )}
          <DetailModal data={selectItem} footer={null} />
          <RequestAttestationModal detail={selectItem} />
        </div>
      </>
    </ContentLayout>
  );
}
