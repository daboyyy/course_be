require("dotenv").config();

const clearTokenInCookie = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 10 * 60 * 1000,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  });
};

const setAccessTokenInCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 10 * 60 * 1000,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  });
};

const setRefreshTokenInCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  });
};

module.exports = {
  clearTokenInCookie,
  setAccessTokenInCookie,
  setRefreshTokenInCookie,
};
