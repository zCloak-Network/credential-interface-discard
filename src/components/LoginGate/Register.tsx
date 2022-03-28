/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-21 20:33:23
 * @LastEditTime: 2022-03-28 22:23:33
 */
import React from "react";
import Button from "../Button";
import HomeLayout from "../HomeLayout";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const isClaimer = useRole();

  const handleSubmit = () => {
    if (isClaimer) {
      navigate("/claimer/register");
    } else {
      navigate("/attester/register");
    }
  };

  const children = (
    <div>
      <div className="title">Welcome to zCloak Credential Center</div>
      <div className="sub-title">Create a New Credential account.</div>
      <Button type="primary" className="login-btn" onClick={handleSubmit}>
        Create account
      </Button>
    </div>
  );

  return (
    <>
      <HomeLayout>{children}</HomeLayout>
    </>
  );
};

export default Register;
