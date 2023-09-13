const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

// Internal
const { verifyAccessToken } = require("./middleware/verifyAccessToken");

require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/customerInfo", verifyAccessToken, require("./routes/customerInfo"));
app.use("/course", verifyAccessToken, require("./routes/course"));

// Listen
app.listen(process.env.PORT || 3030, async () => {
  console.log("Server started at port 3030");
});
