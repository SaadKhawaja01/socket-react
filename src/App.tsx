import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";

export const socket = io("http://192.168.1.11:4000", {
  extraHeaders: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxNjJjOGU4LWY3MzktNDdkNS05NGViLTE5MmE4NDQwYmJkNyIsInBpZCI6IlBMMTY3ODY5NDY1MTAwMCIsIm5hbWUiOiJKb2huIFNtaXRoIiwiZW1haWwiOiJKb2huU21pdGhAeHl6LmNvbSIsInBob25lIjoiMDMwMTUzNTU3OTIiLCJyb2xlIjoiU3RhbmRhcmQiLCJpYXQiOjE2Nzg3MDg0Mjh9.2VAI11ufSjwYBWJnZ-SzOZKJkAS09cup9Exc7FsfcxM",
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
      socket.emit("joinRoom", "b63759d5-f3d7-491c-a54d-36fce9b141b8");

      socket.on("message.received", () => console.log("Received"));
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setIsConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents(previous => [...previous, value]);
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      //   socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
