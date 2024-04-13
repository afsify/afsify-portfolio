const developerModel = require("../../model/developer.model");
const { body, validationResult } = require("express-validator");

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
  discoverDev,
};
