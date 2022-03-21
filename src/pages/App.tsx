/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-11 15:45:14
 * @LastEditTime: 2022-03-21 18:14:24
 */
import React, { useEffect, useState } from "react";
import Register from "./Register";
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
          <Route path="/user" element={<Claimer />} />
          <Route path="/attester/ctypes/new" element={<NewCtype />} />
          <Route path="/attester" element={<Attester />}>
            <Route index element={<AttesterContent />} />
            <Route path="/attester/ctypes" element={<Ctypes />} />
          </Route>
        </Routes>
        <Modals />
      </>
    </StoreGate>
  );
}
