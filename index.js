const app = require("./app.js");
require("dotenv").config();

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
