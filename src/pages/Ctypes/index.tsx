/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 13:53:47
 * @LastEditTime: 2022-05-18 14:55:11
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryCtypes } from "../../services/api";
import ListItem from "./ListItem";
import Loading from "../../components/Loading";
import Empty from "../../components/Empty";
import CtypeDetailModal from "../../components/CtypeDetailModal";
import Button from "../../components/Button";
import { useGetCurrIdentity } from "../../state/wallet/hooks";
import { ICTypeWithMetadata } from "../../types/ctypes";

import "./index.scss";

const Ctypes: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ctypes, setCtypes] = useState<ICTypeWithMetadata[] | null>(null);
  const [detail, setDetail] = useState<ICTypeWithMetadata | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const currAccount = useGetCurrIdentity();

  const handleJump = () => {
    navigate("/credential/attester/attestations/ctypes/new");
  };

  const getData = async () => {
    if (!currAccount || !currAccount.fullDid) return;

    await setLoading(true);
    const res = await queryCtypes({ owner: currAccount.fullDid.did });
    if (res.data.code === 200) {
      await setCtypes(res.data.data);
      await setLoading(false);
    }
  };

  const handleDetail = (data: ICTypeWithMetadata) => {
    setDetail(data);
    setDetailVisible(true);
  };

  useEffect(() => {
    if (!currAccount || !currAccount.fullDid) return;

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currAccount]);

  return (
    <div className="ctypes">
      <div className="btn-wrapper">
        <Button className="create-btn" type="primary" onClick={handleJump}>
          Create CTYPE
        </Button>
      </div>
      {ctypes && ctypes.length > 0 && !loading && (
        <>
          <div className="lists-header">
            <span />
            <span>Create CTYPE</span>
            <span>ctypeHash</span>
            <span />
          </div>
          <ul>
            {ctypes.map((it, index: number) => (
              <ListItem
                data={it}
                key={index}
                index={index}
                handleDetail={handleDetail}
              />
            ))}
          </ul>
        </>
      )}
      {ctypes && ctypes.length === 0 && (
        <Empty description="Your ctype will appear here." />
      )}
      {loading && <Loading />}
      <CtypeDetailModal
        data={detail}
        visible={detailVisible}
        onCancel={() => {
          setDetailVisible(false);
        }}
      />
    </div>
  );
};
export default Ctypes;
