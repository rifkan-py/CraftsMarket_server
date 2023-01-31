const mongoose = require("mongoose");

async function connectDB() {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connection successful");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
