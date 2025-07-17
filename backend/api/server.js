// File: backend/api/index.js
import express    from "express";
import "dotenv/config";
import cors       from "cors";
import serverless from "serverless-http";
import connectDB  from "../config/db.js";
import userRouter     from "../routes/userRoutes.js";
import ownerRouter    from "../routes/ownerRoutes.js";
import bookingRouter  from "../routes/bookingRoutes.js";

const app = express();
let isDbConnected = false;

// Ensure a single DB connection across invocations
async function ensureDb() {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }
}

app.use(cors());
app.use(express.json());

// On every route, make sure DB is ready
app.get("/", async (req, res) => {
  await ensureDb();
  res.send("Server is running");
});

// Protect your routers with DB init
const withDb = (router) => async (req, res, next) => {
  await ensureDb();
  return router(req, res, next);
};

app.use("/api/user",     withDb(userRouter));
app.use("/api/owner",    withDb(ownerRouter));
app.use("/api/bookings", withDb(bookingRouter));

// Export the handler instead of calling app.listen()
export default serverless(app);
