/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 13:53:47
 * @LastEditTime: 2022-03-20 14:04:06
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryCtypes } from "../../services/api";
import ListItem from "./ListItem";
import Loading from "../../components/Loading";
import Empty from "../../components/Empty";

import Button from "../../components/Button";

import "./index.scss";

const Ctypes: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ctypes, setCtypes] = useState(null);

  const handleJump = () => {
    navigate("/attester/ctypes/new");
  };

  const getData = async () => {
    await setLoading(true);
    const res = await queryCtypes();
    if (res.data.code === 200) {
      await setCtypes(res.data.data);
      await setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          </div>
          <ul>
            {ctypes.map((it, index) => (
              <ListItem data={it} key={index} index={index} />
            ))}
          </ul>
        </>
      )}
      {ctypes && ctypes.length === 0 && (
        <Empty description="Your claim will appear here." />
      )}
      {loading && <Loading />}
    </div>
  );
};
export default Ctypes;
