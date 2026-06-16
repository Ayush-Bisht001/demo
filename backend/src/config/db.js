const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MongoDB connection string is missing in .env");
  }

  try {
    const connection = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error.message.includes("bad auth") || error.message.includes("authentication failed")) {
      throw new Error(
        "MongoDB authentication failed. Check the username, password, database user permissions, and URL-encode special characters in your MONGO_URI password."
      );
    }

    throw error;
  }
};

module.exports = connectDB;
