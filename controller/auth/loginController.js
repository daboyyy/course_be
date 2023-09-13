const bcrypt = require("bcrypt");

const { Authentication, CustomerInfo, RefreshToken } = require("../../models");
const { signAccessToken, signRefreshToken } = require("../../utils/jwt");
const {
  setAccessTokenInCookie,
  setRefreshTokenInCookie,
} = require("../../utils/cookie");

require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Invalid input" });

  try {
    const authData = await Authentication.findOne({ where: { email: email } });
    if (!authData) return res.status(401).json({ message: `User not found` });

    const isMatch = await bcrypt.compare(password, authData.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid input" });

    const cusInfoData = await CustomerInfo.findOne({
      where: { userId: authData.user_id },
    });
    if (!cusInfoData) {
      return res.status(500).json({ message: "Unexpected error" });
    }

    const accessToken = signAccessToken(authData.user_id, authData.role_id);
    const refreshToken = signRefreshToken(authData.user_id, authData.role_id);

    const tokenData = await RefreshToken.findOne({
      where: { userId: authData.user_id },
    });
    if (tokenData) {
      await RefreshToken.destroy({
        where: { token: tokenData.token },
      });
    }

    const newRefreshToken = {
      userId: authData.user_id,
      token: refreshToken,
    };
    await RefreshToken.create(newRefreshToken);

    const resData = {
      email: authData.email,
      userId: cusInfoData.user_id,
      firstName: cusInfoData.first_name,
      lastName: cusInfoData.last_name,
      nickname: cusInfoData.nickname,
      gender: cusInfoData.gender,
      birth_date: cusInfoData.birth_date,
    };

    setAccessTokenInCookie(res, accessToken);
    setRefreshTokenInCookie(res, refreshToken);
    res.status(200).json({ data: resData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login };
