import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is runnig")
});

app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
});

export default app;