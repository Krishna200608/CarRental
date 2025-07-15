delete process.env.HTTP_PROXY;
delete process.env.http_proxy;
delete process.env.HTTPS_PROXY;
delete process.env.https_proxy;

process.env.NO_PROXY = 'upload.imagekit.io';

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";

// Initialize Express App
const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is runnig")
});
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
});
