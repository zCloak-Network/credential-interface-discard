/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-20 13:59:43
 * @LastEditTime: 2022-01-20 14:44:36
 */
import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Credential: React.FC = () => {
  const navigate = useNavigate();

  const handleJump = (url) => {
    navigate(url);
  };

  return (
    <div className="credential">
      <div className="title">Choose your identity</div>
      <div className="role" onClick={() => handleJump("/claimer")}>
        I am a user.
      </div>
      <div className="role" onClick={() => handleJump("/attester")}>
        I am a attester.
      </div>
    </div>
  );
};
export default Credential;
