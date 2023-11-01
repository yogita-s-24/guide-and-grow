import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();

const app = express();
app.use(express.json());


// Implemented a new POST endpoint for user login in the Express.js application. Users can authenticate by providing their email and password. If the provided email and password match a user in the database, the API responds with a success message and the user's data. If the credentials are invalid, an appropriate error message is returned.

app.post("/logins", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter your email address and password ",
    });
  }
  const loginuser = await User.findOne({ email: email, password: password });
  if (loginuser) {
    res.json({
      success: true,
      data: loginuser,
      message: " You are login successfully ",
    });
  } else {
    res.json({
      success: false,
      message: " invalid credentials ",
    });
  }
});

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on PORT  ${PORT}`);
  connectDB();
});
