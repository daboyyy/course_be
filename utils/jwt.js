const jwt = require("jsonwebtoken");

const signAccessToken = (userId, roleId) => {
  return jwt.sign(
    { userId: userId, roleId: roleId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );
};

const signRefreshToken = (userId, roleId) => {
  return jwt.sign(
    { userId: userId, roleId: roleId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "3d",
    }
  );
};

module.exports = { signAccessToken, signRefreshToken };
