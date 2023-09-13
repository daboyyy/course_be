const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const db = require("../../db");
const { Authentication, CustomerInfo, RefreshToken } = require("../../models");
const {
  setAccessTokenInCookie,
  setRefreshTokenInCookie,
} = require("../../utils/cookie");
const { signAccessToken, signRefreshToken } = require("../../utils/jwt");
const { emailRegex } = require("../../utils/regex");

const register = async (req, res) => {
  const isPass = validateInput(req.body);
  const { email, password, roleId } = req.body;
  if (!isPass) return res.status(400).json({ message: "Invalid input" });

  const duplicateData = await Authentication.findOne({
    where: { email: email },
  });
  if (duplicateData)
    return res
      .status(409)
      .json({ message: `This email ${email} already created.` });

  const txn = await db.transaction();
  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUserId = nanoid();
    const newAuth = {
      user_id: newUserId,
      email: email,
      passwordHash: hashedPwd,
      roleId: roleId,
    };
    await Authentication.create(newAuth, { transaction: txn });

    const newCusInfo = {
      userId: newUserId,
      email: email,
    };
    await CustomerInfo.create(newCusInfo, { transaction: txn });

    const accessToken = signAccessToken(newAuth.user_id, newAuth.roleId);
    const refreshToken = signRefreshToken(newAuth.user_id, newAuth.roleId);

    const newRefreshToken = {
      userId: newAuth.user_id,
      token: refreshToken,
    };
    await RefreshToken.create(newRefreshToken, { transaction: txn });
    await txn.commit();

    setAccessTokenInCookie(res, accessToken);
    setRefreshTokenInCookie(res, refreshToken);
    res.status(201).json({ message: `New user ${email} created!` });
  } catch (err) {
    await txn.rollback();
    res.status(500).json({ message: err.message });
  }
};

const validateInput = (body) => {
  const { email, password, roleId } = body;
  if (!email || !password || !roleId) return false;
  if (!emailRegex.test(email)) return false;

  return true;
};

module.exports = { register };
