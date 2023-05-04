import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";

function useConnection(url: string) {
    const [conn, setConn] = useState<signalR.HubConnection>();
    const [gameId, setGameId] = useState('');

    useEffect(() => {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl(url)
            // .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", data => {
            console.log("ReceiveMessage", data);
        });

        connection.on('LobbyCreated', data => {
            console.log('LobbyCreated', data);
            setGameId(data);
        });

        connection.on('GameStarted', data => {
            console.log('GameStarted', data)
        });

        connection.start()
            .then(() => {
                setConn(connection);
                console.log("SignalR Connected.", connection.connectionId);
            })
            .catch(e => console.warn(e));

        return () => {
            if (connection.state == signalR.HubConnectionState.Connecting) {
                setTimeout(() => {
                    connection.stop();
                }, 500);
            } else {
                connection.stop();
            }
        };
    }, [url]);

    return { conn, gameId }
}

export default function Lobby() {
    const { conn, gameId } = useConnection('/chatHub');

    function close() {
        conn?.stop();
    }

    function createGame() {
        conn?.send('CreateLobby')
    }

    function startGame() {
        conn?.send('StartGame', gameId)
    }

    return (
        <div className="App">
            <h3>lobby</h3>
            <p>{gameId}</p>
            <header>
                <button onClick={() => createGame()}>create lobby</button>
                <button onClick={() => startGame()}>start game</button>
                <button onClick={() => close()}>close connection</button>
            </header>
        </div>
    );
}