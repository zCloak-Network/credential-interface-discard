/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-11 15:45:14
 * @LastEditTime: 2022-03-28 15:41:33
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

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigate("./login");
  }, []);

  const init = async () => {
    await Kilt.init({ address: WSSURL });
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <StoreGate password={password}>
      <>
        <Popups />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route
            path="/login"
            element={
              <LoginGate
                handlePassword={(pwd) => {
                  setPassword(pwd);
                }}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register-again"
            element={<RegisterAgain password={password} />}
          />
          <Route path="/user" element={<Claimer />} />
          <Route path="/attester/ctypes/new" element={<NewCtype />} />
          <Route path="/attester" element={<Attester />}>
            <Route index element={<AttesterContent />} />
            <Route path="/attester/ctypes" element={<Ctypes />} />
          </Route>
        </Routes>
        <Modals />
        <ErrorModal
          resetPassword={() => {
            setPassword("");
            navigate("./login");
          }}
        />
      </>
    </StoreGate>
  );
}
