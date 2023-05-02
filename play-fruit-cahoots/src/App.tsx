import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as signalR from "@microsoft/signalr";

function App() {
  let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .configureLogging(signalR.LogLevel.Debug)
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", data => {
    console.log("ReceiveMessage", data);
  });

  async function start() {
    try {
      await connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log(err);
      setTimeout(start, 5000);
    }
  };

  function send(): void {
    connection.send("SendMessage", "Hello", "world")
  }

  function close() {
    connection.stop();
  }

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
        <button onClick={() => start()}>start</button>
        <button onClick={() => send()}>send</button>
        <button onClick={() => close()}>close</button>
      </header>
    </div>
  );
}

export default App;
