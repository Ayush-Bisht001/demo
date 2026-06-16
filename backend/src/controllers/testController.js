const cloudinary = require("../config/cloudinary");

const getTestMessage = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Frontend connected to backend successfully"
  });
};

const getCloudinaryStatus = (req, res) => {
  const isConfigured = Boolean(
    cloudinary.config().cloud_name &&
      cloudinary.config().api_key &&
      cloudinary.config().api_secret
  );

  res.status(200).json({
    success: true,
    message: isConfigured
      ? "Cloudinary credentials are loaded"
      : "Cloudinary credentials are missing",
    cloudinary: isConfigured ? "configured" : "not configured"
  });
};

module.exports = {
  getTestMessage,
  getCloudinaryStatus
};
