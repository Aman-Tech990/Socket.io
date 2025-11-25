import { useEffect } from 'react';
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useMemo } from 'react';

const App = () => {

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("Connected: ", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    })

    return () => {
      socket.disconnect();
    }

  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  }

  const joinRoomHandler = (e) => {
    socket.emit("join-room", roomName);
    setRoomName("");
  }

  return (
    <Container maxWidth="sm">
      <Typography variant='h4' component='div' gutterBottom>
        Welcome to Socket.io
      </Typography>

      <Typography variant='h5' component='div' gutterBottom>
        {socket.id}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TextField
            id="outlined-basic"
            label="Enter room name"
            variant="outlined"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Button variant='contained' color='primary' type="submit">
            Join Room
          </Button>
        </div>
      </form>

      <br /><br /><hr /><br /><br />

      <form
        onSubmit={submitHandler}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <TextField
          id="outlined-basic"
          label="Type Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button variant='contained' color='primary' type="submit">Send</Button>
      </form>

      <Stack>
        {
          messages.map((m, i) => {
            return (
              <Typography key={i} variant='h6' component='div' gutterBottom>
                {m}
              </Typography>
            );
          })
        }
      </Stack>
    </Container>
  )
}


export default App;