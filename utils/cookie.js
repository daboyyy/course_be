const clearTokenInCookie = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

const setAccessTokenInCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 10 * 60 * 1000,
    domain: ".vercel.app",
  });
};

const setRefreshTokenInCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  clearTokenInCookie,
  setAccessTokenInCookie,
  setRefreshTokenInCookie,
};
