import User from "../models/User.js";

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

  export {postApiSignup, postApiLogin};