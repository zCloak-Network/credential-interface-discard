/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 14:42:05
 * @LastEditTime: 2022-03-28 22:16:28
 */
import React, { useState } from "react";
import ListItem from "./ListItem";
import Button from "../../components/Button";
import { useGetClaims } from "../../state/claim/hooks";
import { useGetAttestations } from "../../state/attestations/hooks";
import { useToggleCreateClaimModal } from "../../state/application/hooks";
import DetailModal from "../DetailModal";
import RequestAttestationModal from "../RequestAttestationModal";
import Empty from "../../components/Empty";
import ContentLayout from "../../components/ContentLayout";

import "./index.scss";

const MODOLE = [
  {
    title: "Claimer",
    key: "claimer",
    url: "/claimer/claims",
  },
];

export default function Claimer(): JSX.Element {
  const data = useGetClaims();
  const attestations = useGetAttestations();
  const [selectItem, setSelectItem] = useState();
  const toggleConnectWalletModal = useToggleCreateClaimModal();

  const handleCreateClaim = () => {
    toggleConnectWalletModal();
  };

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
                  <span>Status</span>
                  <span>Time</span>
                  <span />
                </div>
                {data?.map((item, index) => {
                  const attestation = attestations.find(
                    (it) => it.attestation.cTypeHash == item.claim?.cTypeHash
                  );

                  return (
                    <div key={`${item.id}-${index}`} className="claimer-list">
                      <ListItem
                        data={item}
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
