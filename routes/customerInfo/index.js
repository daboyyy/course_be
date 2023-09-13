const express = require("express");

const cusInfoController = require("../../controller/customerInfo/cusInfoController");

const router = express.Router();
router.get("/getInfo", cusInfoController.getCusInfo);

module.exports = router;
