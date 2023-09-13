const jwt = require("jsonwebtoken");
require("dotenv").config();

const { RefreshToken } = require("../../models");
const { setAccessTokenInCookie } = require("../../utils/cookie");
const { signAccessToken } = require("../../utils/jwt");

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return res.status(401).json({ message: "Invalid input" });
  const refreshToken = cookies.refreshToken;

  try {
    const tokenData = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!tokenData) return res.status(403).json({ message: `Invalid token` });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || tokenData.user_id !== decoded.userId) {
          return res.status(403).json({ message: `Invalid token` });
        }

        const accessToken = signAccessToken(tokenData.user_id, decoded.roleId);
        setAccessTokenInCookie(res, accessToken);

        res.status(200).json({ message: `Success` });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { refreshToken };
