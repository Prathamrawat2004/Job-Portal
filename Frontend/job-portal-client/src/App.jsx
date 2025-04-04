import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { ResultContext } from "../src/Context/ResultContext";

function App() {
  const { resultAck } = useContext(ResultContext); // Get the global state
  return (
    <>
      <Navbar resultAck = {resultAck}/>
      <Outlet />
    </>
  );
}

export default App;
