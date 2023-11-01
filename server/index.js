import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.post("/signup", async (req, res) => {
  const { name, email, mobile, password, address, gender } = req.body;
  const user = new User({ name, email, mobile, password, address, gender });
  try {
    const savedUser = await user.save();
    res.json({
      success: true,
      data: savedUser,
      message: "User signup successfully ",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};

app.listen(PORT, () => {
  console.log(`Server Running on PORT  ${PORT}`);
  connectDB();
});
