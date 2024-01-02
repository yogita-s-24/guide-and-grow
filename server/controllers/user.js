import User from "../models/User.js";
import bcrypt from "bcrypt"

const postApiSignup = async (req, res) => {
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
  }
//  this v2 api have password security in database 
  const postApiV2Signup = async (req, res) => {
    const { name, email, mobile, password, address, gender } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const nameAlreadyExists = await User.findOne({ name });
      if (nameAlreadyExists) {
        return res.status(400).json({
          success: false,
          message: "This Name already exists",
        });
      }
  
      const emailAlreadyExists = await User.findOne({ email });
      if (emailAlreadyExists) {
        return res.status(400).json({
          success: false,
          message: "This Email already exists",
        });
      }
  
      const mobileAlreadyExists = await User.findOne({ mobile });
      if (mobileAlreadyExists) {
        return res.status(400).json({
          success: false,
          message: "This Mobile already exists",
        });
      }
  
      const newUser = new User({
        name,
        email,
        mobile,
        password: hashedPassword,
        address,
        gender,
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({
        success: true,
        data: savedUser,
        message: "User saved successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  const postApiLogin = async (req, res) => {
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
  }

  const postApiV2Login = async (req, res) => {
    const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.status(200).json({
        success: true,
        data: user,
        message: "You have logged in successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
  }

  export {postApiSignup, postApiLogin , postApiV2Signup , postApiV2Login};