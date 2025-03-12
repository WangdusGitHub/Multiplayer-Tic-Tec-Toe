import React from "react";
import "./App.css";
import Heading from "./components/Heading";
import TecTacToe from "./components/TecTacToe";
import { io } from "socket.io-client";
import { useState } from "react";



export default function App() {
  return (
    <>
      <Heading text="Tec-Tac-Toe" />
      <TecTacToe />
    </>
  );
}
