const sequelize = require("sequelize");

const { Course } = require("../../models");

const op = sequelize.Op;

const courseSearch = async (req, res) => {
  const { roleId, userId } = req;
  if (!userId || !roleId) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const {
    page = 1,
    limit = 10,
    orderBy = "enrolled",
    sortBy = "desc",
    title,
  } = req.query;

  try {
    const query = {};
    if (title) {
      query.title = { [op.substring]: title };
    }

    const adminRoleId = 2;
    if (roleId == adminRoleId) {
      query.user_id = { [op.substring]: userId };
    }

    const convertLimit = Number(limit);
    const queries = {
      offset: (page - 1) * convertLimit,
      limit: convertLimit,
    };

    if (orderBy) {
      queries.order = [[orderBy, sortBy]];
    }

    const data = await Course.findAndCountAll({
      where: query,
      ...queries,
    });

    const resData = {
      totalPages: Math.ceil(data?.count / convertLimit),
      totalItems: data?.count,
      data: data?.rows,
    };

    res.status(200).json({ data: resData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { courseSearch };
