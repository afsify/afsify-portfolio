const developerModel = require("../../model/developer.model");
const { body, validationResult } = require("express-validator");

//! ============================================= List Developer =============================================

const listDev = async (req, res, next) => {
  try {
    const devData = await developerModel
      .findOne({ user: req.userId })
      .populate("user", ["name", "email", "developer", "image"])
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).send({
      message: "DevData Fetched Successfully",
      success: true,
      data: devData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =========================================== Discover Developer ===========================================

const discoverDev = async (req, res, next) => {
  try {
    const devData = await developerModel
      .find({ status: "accepted" })
      .populate("user", ["name", "email", "developer", "image"])
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "DevData Fetched Successfully",
      success: true,
      data: devData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

module.exports = {
  listDev,
  discoverDev,
};
