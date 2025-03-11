import React from 'react'
import "./App.css";
import Heading from "./components/Heading";
import TecTacToe from './components/TecTacToe';


export default function App() {
  return (
    <>
      <Heading text = "Tec-Tac-Toe" />

      <TecTacToe/>
    </>
  )
}
