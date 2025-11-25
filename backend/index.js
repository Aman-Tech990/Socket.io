import express from 'express';
import cors from "cors";
import { Server } from 'socket.io';
import { createServer } from "http";

const app = express();
const server = createServer(app);
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hi from server!"
    });
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: `, socket.id);

    socket.emit("welcome", `Welcome to server ${socket.id}`);

    socket.on("message", ({ message, room }) => {
        console.log({ room, message });
        io.to(room).emit("receive-message", message);
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}!`);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: `, socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});