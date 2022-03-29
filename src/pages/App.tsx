/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-11 15:45:14
 * @LastEditTime: 2022-03-29 17:11:30
 */
import React, { useEffect, useState } from "react";
import Register from "./Register";
import RegisterAgain from "./Register/RegisterAgain";
import { useNavigate } from "react-router-dom";
import LoginGate from "../components/LoginGate";
import { Route, Routes, Navigate } from "react-router-dom";
import Claimer from "./Claimer";
import Attester from "./Attester";
import AttesterContent from "./AttesterContent";
import Ctypes from "./Ctypes";
import NewCtype from "./NewCtype";
import Modals from "./Modals";
import Popups from "../components/Popups";
import StoreGate from "../components/StoreGate";
import * as Kilt from "@kiltprotocol/sdk-js";
import { WSSURL } from "../constants";
import ErrorModal from "../components/ErrorModal";
import useRole from "../hooks/useRole";

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const isClaimer = useRole();
  const [password, setPassword] = useState("");

  const navigateTo = () => {
    if (isClaimer) {
      navigate("/claimer/login");
    } else {
      navigate("/attester/login");
    }
  };

  useEffect(() => {
    navigateTo();
  }, []);

  const init = async () => {
    await Kilt.init({ address: WSSURL });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <StoreGate password={password} isClaimer={isClaimer}>
      <>
        <Popups />
        <Routes>
          <Route
            path="/claimer"
            element={<Navigate replace to="/claimer/login" />}
          />

          {/* TODO  refactor route */}
          <Route
            path="/claimer/login"
            // path="/:role/login"
            element={
              <LoginGate
                handlePassword={(pwd) => {
                  setPassword(pwd);
                }}
              />
            }
          />
          <Route
            path="/attester"
            element={<Navigate replace to="/attester/login" />}
          />
          <Route
            path="/attester/login"
            element={
              <LoginGate
                handlePassword={(pwd) => {
                  setPassword(pwd);
                }}
              />
            }
          />
          <Route path="/claimer/register" element={<Register />} />
          <Route path="/attester/register" element={<Register />} />
          <Route
            path="/claimer/register-again"
            element={<RegisterAgain password={password} />}
          />
          <Route
            path="/attester/register-again"
            element={<RegisterAgain password={password} />}
          />
          <Route path="/claimer/claims" element={<Claimer />} />
          <Route
            path="/attester/attestations/ctypes/new"
            element={<NewCtype />}
          />
          <Route path="/attester/attestations" element={<Attester />}>
            <Route index element={<AttesterContent />} />
            <Route path="/attester/attestations/ctypes" element={<Ctypes />} />
          </Route>
        </Routes>
        <Modals />
        <ErrorModal
          resetPassword={() => {
            setPassword("");
            navigateTo();
          }}
        />
      </>
    </StoreGate>
  );
}
