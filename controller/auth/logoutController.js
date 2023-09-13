const { RefreshToken } = require("../../models");
const { clearTokenInCookie } = require("../../utils/cookie");

require("dotenv").config();

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return res.status(401).json({ message: "Invalid input" });
  const refreshToken = cookies.refreshToken;

  try {
    const tokenData = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!tokenData) {
      clearTokenInCookie(res);
      return res.status(204).json({ message: `Success` });
    }

    await RefreshToken.destroy({
      where: { token: refreshToken },
    });

    clearTokenInCookie(res);
    res.status(204).json({ message: `Success` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { logout };
