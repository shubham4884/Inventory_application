const mongoose = require("mongoose");

// Setup Mongodb connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/usersdb', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
