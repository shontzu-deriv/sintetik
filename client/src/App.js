import "./App.css";
import io from "socket.io-client";
import Chart from "./Chart";
import Child from "./components/child.tsx";
import React, { useState, useEffect } from "react";
import { UserStore } from "./store/user";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState("Vol50");
  const [authenticate, setAuthenticate] = useState(false);
  const [val, setVal] = useState("");
  const [tick, setTick] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("hello", (obj) => {
      setVal(obj.val);
      setTick(obj.tick);
      setData(currentData => [...currentData, val]);
      console.log(data);
    });
  });

  function Login() {
    setIndex("Volatility 50");
    if (username !== "" && password !== "") {
      setAuthenticate(true);
    }
  }

  return (
    <div className="App">
      {!authenticate ? (
        // <div className="joinChatContainer">
        //   <h3>Login</h3>
        //   <input
        //     type="text"
        //     placeholder="setUsername"
        //     onChange={(event) => {
        //       setUsername(event.target.value);
        //     }}
        //   />
        //   <input
        //     type="password"
        //     placeholder="setPassword"
        //     onChange={(event) => {
        //       setPassword(event.target.value);
        //     }}
        //   />
        //   <button onClick={Login}>Login</button>
        //   <h1>{tick}:{val}</h1>
        // </div>
        <Child userStore={UserStore}/>
      ) : (
        <Chart socket={socket} username={username} index={index} val={val} tick={tick} data={data}/>
      )}
    </div>
  );
}

export default App;
