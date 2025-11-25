import express from 'express';
import cors from "cors";

const app = express();
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

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});