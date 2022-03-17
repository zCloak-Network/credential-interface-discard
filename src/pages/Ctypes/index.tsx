/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 13:53:47
 * @LastEditTime: 2022-01-25 15:35:53
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryCtypes } from "../../services/api";
import ListItem from "./ListItem";

import Button from "../../components/Button";

import "./index.scss";

const Ctypes: React.FC = () => {
  const navigate = useNavigate();
  const [ctypes, setCtypes] = useState([]);

  const handleJump = () => {
    navigate("/attester/ctypes/new");
  };

  const getData = async () => {
    const res = await queryCtypes();
    await setCtypes(res.data.data);
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
    </div>
  );
};
export default Ctypes;
