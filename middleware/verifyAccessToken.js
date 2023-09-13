const jwt = require("jsonwebtoken");

const { errorCode } = require("../const/error");

require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.accessToken)
    return res
      .status(401)
      .json({ errorCode: errorCode.invalidToken, message: "Invalid token" });
  const accessToken = cookies.accessToken;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ errorCode: errorCode.invalidToken, message: "Invalid token" });
    req.userId = decoded.userId;
    req.roleId = decoded.roleId;

    next();
  });
};

module.exports = { verifyAccessToken };
