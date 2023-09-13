const clearTokenInCookie = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 10 * 60 * 1000,
    domain: ".vercel.app",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
    domain: ".vercel.app",
  });
};

const setAccessTokenInCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 10 * 60 * 1000,
    domain: ".vercel.app",
  });
};

const setRefreshTokenInCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
    domain: ".vercel.app",
  });
};

module.exports = {
  clearTokenInCookie,
  setAccessTokenInCookie,
  setRefreshTokenInCookie,
};
