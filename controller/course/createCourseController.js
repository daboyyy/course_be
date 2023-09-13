const { Course } = require("../../models");

const createCourse = async (req, res) => {
  const { roleId, userId } = req;
  const { title, description, category, subject } = req.body;
  const validateData = {
    roleId,
    userId,
    title,
    description,
    category,
    subject,
  };
  const isPass = validateInput(validateData);
  if (!isPass) return res.status(400).json({ message: "Invalid input" });

  const defaultImageUrl =
    "https://ik.imgkit.net/ikmedia/logo/light_T4buIzohVH.svg";

  var mockEndDate = new Date();
  mockEndDate.setDate(mockEndDate.getDate() + 365);
  const newCourse = {
    userId: userId,
    title: title,
    description: description,
    imageUrl: defaultImageUrl,
    category: category,
    subject: subject,
    enrolled: 0,
    startedAt: new Date(),
    endedAt: mockEndDate,
  };

  try {
    await Course.create(newCourse);

    res.status(201).json({ message: "Created!" });
  } catch (err) {
    await txn.rollback();
    res.status(500).json({ message: err.message });
  }
};

const validateInput = (data) => {
  const isInvalidIdentity = !data.userId || !data.roleId || data.roleId !== 2;
  const isInvalidPayload =
    !data.title || !data.description || !data.category || !data.subject;
  if (isInvalidIdentity || isInvalidPayload) return false;

  return true;
};

module.exports = { createCourse };
