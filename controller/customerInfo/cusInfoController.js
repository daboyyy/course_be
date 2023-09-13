const { CustomerInfo } = require("../../models");

const getCusInfo = async (req, res) => {
  const { roleId, userId } = req;
  if (!userId) return res.status(400).json({ message: "Invalid input" });

  try {
    const cusInfoData = await CustomerInfo.findOne({
      where: { userId: userId },
    });
    if (!cusInfoData) {
      return res.status(500).json({ message: "Unexpected error" });
    }

    const resData = {
      email: cusInfoData.email,
      userId: cusInfoData.user_id,
      firstName: cusInfoData.first_name || "",
      lastName: cusInfoData.last_name || "",
      nickname: cusInfoData.nickname || "",
      gender: cusInfoData.gender || "",
      birth_date: cusInfoData.birth_date || "",
      roleId: roleId,
    };

    res.status(200).json({ data: resData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCusInfo };
