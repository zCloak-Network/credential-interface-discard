/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 14:42:05
 * @LastEditTime: 2022-05-16 11:49:27
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
import { IClaim, IEncryptedMessage } from "@kiltprotocol/types";
import { ICredential } from "../GuideNew";
import { IClaimSingle } from "../../state/claim/reducer";

import "./index.scss";

const MODOLE = [
  {
    title: "User",
    key: "user",
    url: "/credential/user/claims",
  },
];

export default function Claimer(): JSX.Element {
  const allClaims = useGetClaims();
  const claimers = useGetClaimers();
  const currAccount = useGetCurrIdentity();
  const [attestationLoading, setAttestationLoading] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<IClaimSingle | null>(null);
  const [attestations, setAttestations] = useState<ICredential[]>([]);
  const toggleConnectWalletModal = useToggleCreateClaimModal();
  const navigate = useNavigate();

  const handleCreateClaim = () => {
    toggleConnectWalletModal();
  };

  const decryptAttestation = async (data: IEncryptedMessage[]) => {
    const dataAll: Promise<ICredential>[] = [];

    await data.forEach((it) => {
      dataAll.push(decrypt(it));
    });

    return Promise.all(dataAll).then((res) => {
      return res;
    });
  };

  const decrypt = async (data: IEncryptedMessage) => {
    if (!currAccount) return;

    const keystore = new Kilt.Did.DemoKeystore();
    const lightKeypairs = await generateLightKeypairs(
      keystore,
      currAccount.mnemonic
    );
    const lightDid = await generateLightDid(lightKeypairs);

    const decryptedRequestForAttestationMessage = (await Kilt.Message.decrypt(
      data,
      keystore,
      lightDid
    )) as any;

    return decryptedRequestForAttestationMessage;
  };

  const queryAttestations = async () => {
    if (!currAccount) return;

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

  const getLatestAttestation = (data: { claim: IClaim }) => {
    const all = attestations.filter(
      (it) =>
        it?.body?.content?.attestation?.cTypeHash === data.claim?.cTypeHash
    );

    const dataSort = all.sort((a, b) => {
      return b.createdAt < a.createdAt ? -1 : 1;
    });

    return dataSort[0];
  };

  useEffect(() => {
    if (currAccount && currAccount.mnemonic) {
      queryAttestations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currAccount]);

  const data = allClaims.filter(
    (it) => it?.claim.owner === currAccount?.lightDidDetails?.did
  );

  const handleCreateAccount = () => {
    navigate("/credential/user/register-again");
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
                  const attestation = getLatestAttestation(item);

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
          {selectItem && <DetailModal data={selectItem} footer={null} />}

          <RequestAttestationModal detail={selectItem} />
        </div>
      </>
    </ContentLayout>
  );
}
