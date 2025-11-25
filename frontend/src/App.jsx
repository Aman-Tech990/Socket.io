import React from 'react';
import { useEffect } from 'react';
import { io } from "socket.io-client";

const App = () => {

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    }

  }, []);

  return (
    <div>
      App
    </div>
  )
}

export default App;