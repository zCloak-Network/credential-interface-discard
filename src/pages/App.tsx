/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-11 15:45:14
 * @LastEditTime: 2022-04-09 16:05:31
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
import useGuide from "../hooks/useGuide";
import Guide from "./Guide";
import GuideNew from "./GuideNew";

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const isClaimer = useRole();
  const isGuide = useGuide();
  const [password, setPassword] = useState("");

  const navigateTo = () => {
    if (isGuide) {
      navigate("/guide/new");
    } else if (isClaimer) {
      navigate("/user/login");
    } else {
      navigate("/attester/login");
    }
  };

  useEffect(() => {
    navigateTo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/new" element={<GuideNew />} />
          <Route path="/user" element={<Navigate replace to="/user/login" />} />
          {/* TODO  refactor route */}
          <Route
            path="/user/login"
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
          <Route path="/user/register" element={<Register />} />
          <Route path="/attester/register" element={<Register />} />
          <Route
            path="/user/register-again"
            element={<RegisterAgain password={password} />}
          />
          <Route
            path="/attester/register-again"
            element={<RegisterAgain password={password} />}
          />
          <Route path="/user/claims" element={<Claimer />} />
          <Route
            path="/attester/attestations/ctypes/new"
            element={<NewCtype />}
          />
          <Route
            path="/attester/attestations"
            element={
              <Attester
                resetPassword={() => {
                  setPassword("");
                  navigateTo();
                }}
              />
            }
          >
            <Route index element={<AttesterContent />} />
            <Route path="/attester/attestations/ctypes" element={<Ctypes />} />
          </Route>
        </Routes>
        <Modals
          resetPassword={() => {
            setPassword("");
            navigateTo();
          }}
        />
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
