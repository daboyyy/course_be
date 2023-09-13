const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Internal
const { verifyAccessToken } = require("./middleware/verifyAccessToken");

const corsOptions = {
  origin: process.env.ALLOW_CORS_ORIGIN,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/health", (req, res) => {
  res.status(200).json({ message: "Sucess" });
});
app.use("/auth", require("./routes/auth"));
app.use("/customerInfo", verifyAccessToken, require("./routes/customerInfo"));
app.use("/course", verifyAccessToken, require("./routes/course"));

module.exports = app;
