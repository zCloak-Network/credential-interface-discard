/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-11 15:45:14
 * @LastEditTime: 2022-05-23 15:44:56
 */
import { useEffect, useState } from "react";
import Register from "./Register";
import RegisterAgain from "./Register/RegisterAgain";
import LoginGate from "../components/LoginGate";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import Guide from "./Guide";
import { useLocation } from "react-router-dom";
import Web3Gate from "./Web3Gate";

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const isClaimer = useRole();
  const location = useLocation();
  const [password, setPassword] = useState("");

  const navigateTo = () => {
    const path = location.pathname;

    const regx = /^\/credential\/?$/;

    if (regx.test(path) || path.startsWith("/credential/user")) {
      navigate("/credential/user/login");
      return;
    }

    if (path.startsWith("/credential/attester")) {
      navigate("/credential/attester/login");
      return;
    }

    navigate("/");
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
      <Web3Gate>
        <>
          <Popups />
          <Routes>
            <Route
              path="/credential/user"
              element={<Navigate replace to="/credential/user/login" />}
            />
            {/* TODO  refactor route */}
            <Route
              path="/credential/user/login"
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
              path="/credential/attester"
              element={<Navigate replace to="/credential/attester/login" />}
            />
            <Route
              path="/credential/attester/login"
              element={
                <LoginGate
                  handlePassword={(pwd) => {
                    setPassword(pwd);
                  }}
                />
              }
            />
            <Route path="/credential/user/register" element={<Register />} />
            <Route
              path="/credential/attester/register"
              element={<Register />}
            />
            <Route
              path="/credential/user/register-again"
              element={<RegisterAgain password={password} />}
            />
            <Route
              path="/credential/attester/register-again"
              element={<RegisterAgain password={password} />}
            />
            <Route path="/credential/user/claims" element={<Claimer />} />
            <Route
              path="/credential/attester/attestations/ctypes/new"
              element={<NewCtype />}
            />
            <Route
              path="/credential/attester/attestations"
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
              <Route
                path="/credential/attester/attestations/ctypes"
                element={<Ctypes />}
              />
            </Route>
            <Route path="/*" element={<Guide />} />
          </Routes>
          <Modals />
          <ErrorModal
            resetPassword={() => {
              setPassword("");
              navigateTo();
            }}
          />
        </>
      </Web3Gate>
    </StoreGate>
  );
}
