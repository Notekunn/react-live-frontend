import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const SERVER = "https://127.0.0.1:8080"
function App() {
    useEffect(function () {
        const socket = io(SERVER);
        socket.on('connect', console.log);
        // socket.on('event', function (data) { });
        // socket.on('disconnect', function () { });
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Tài ngu
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
