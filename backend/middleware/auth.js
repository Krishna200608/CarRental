import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  // 1) Check for Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized: no token" });
  }

  // 2) Ensure it starts with 'Bearer '
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(400)
      .json({ success: false, message: "Bad request: malformed token" });
  }
  const token = parts[1];

  try {
    // 3) Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized: invalid token" });
    }

    // 4) Load user from DB (without password)
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 5) Attach user and continue
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err);
    let message = "Token verification failed";
    if (err.name === "TokenExpiredError") {
      message = "Token expired";
    }
    return res
      .status(401)
      .json({ success: false, message });
  }
};

export default protect;
