/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-29 14:51:59
 * @LastEditTime: 2022-03-29 20:07:16
 */
import React from "react";
import NotFound from "../../images/not_found.png";
import Button from "../../components/Button";

import "./CreateDid.scss";

type Props = {
  balance: number | null;
  handleCreate: () => void;
};

const CreateDid: React.FC<Props> = ({ balance, handleCreate }) => {
  const jumpTofaucet = () => {
    window.open("https://faucet.peregrine.kilt.io/");
  };

  return (
    <div className="create-did">
      <img src={NotFound} alt="" />
      <div className="title">
        Before becoming an official attester, you need to generate a DID.
      </div>
      {balance === 0 ? (
        <Button type="primary" className="faucet-btn" onClick={jumpTofaucet}>
          No token? Apply for some.
        </Button>
      ) : (
        <Button type="primary" className="create-btn" onClick={handleCreate}>
          Create DID
        </Button>
      )}

      <div className="sub-title">
        This will initiate a transaction to kilt and stake your 2 tokens.
      </div>
    </div>
  );
};
export default CreateDid;
