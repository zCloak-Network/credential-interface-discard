/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 14:42:05
 * @LastEditTime: 2022-03-17 13:42:30
 */
/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-03 16:35:07
 * @LastEditTime: 2022-01-18 16:48:22
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import Button from "../../components/Button";
import { useGetClaims } from "../../state/claim/hooks";
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
    url: "/claimer",
  },
];

export default function Claimer(): JSX.Element {
  const navigate = useNavigate();
  const data = useGetClaims();
  const [selectItem, setSelectItem] = useState();
  const toggleConnectWalletModal = useToggleCreateClaimModal();

  const handleClick = () => {
    navigate("/");
  };

  const handleCreateClaim = () => {
    toggleConnectWalletModal();
  };

  const detail = {
    claim: {
      cTypeHash: "oxxxxxx",
      contents: {
        age: 22,
      },
      owner: "oxxxxxxxxx",
    },
  };
  console.log(78787, selectItem);
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
                {data?.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="claimer-list">
                    <ListItem
                      data={item}
                      index={index + 1}
                      setSelectItem={(value) => {
                        setSelectItem(value);
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {data && data.length === 0 && (
            <Empty description="Your claim will appear here." />
          )}
          <DetailModal data={selectItem} />
          <RequestAttestationModal detail={selectItem} />
        </div>
      </>
    </ContentLayout>
  );
}
