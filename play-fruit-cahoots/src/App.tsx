import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as signalR from "@microsoft/signalr";

function App() {
  let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", data => {
    console.log("ReceiveMessage", data);
  });

  connection.on('LobbyCreated', data => {
    console.log('LobbyCreated', data);
  });

  connection.on('GameStarted', data => {
    console.log('GameStarted', data)
  })

  async function start() {
    try {
      await connection.start();
      console.log("SignalR Connected.", connection.connectionId);
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

  function createGame() {
    connection.send('CreateLobby')
  }

  function startGame() {
    connection.send('StartGame', 'test group')
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => start()}>open connection</button>
        <button onClick={() => createGame()}>create lobby</button>
        <button onClick={() => startGame()}>start game</button>
        <button onClick={() => close()}>close connection</button>
      </header>
    </div>
  );
}

export default App;
