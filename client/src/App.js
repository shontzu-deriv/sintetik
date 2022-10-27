import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chart from "./Chart";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState("Vol50");
  const [authenticate, setAuthenticate] = useState(false);

  function Login(){
    setIndex("Volatility 50");
    if (username !== "" && password !== "") {
      setAuthenticate(true);
    }
  };

  return (
    <div className="App">
      {!authenticate ? (
        <div className="joinChatContainer">
          <h3>Login</h3>
          <input
            type="text"
            placeholder="setUsername"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="setPassword"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={Login}>Login</button>
        </div>
      ) : (
        <Chart socket={socket} username={username} index={index} />
      )}
    </div>
  );
}

export default App;
