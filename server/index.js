import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Course from "./models/Course.js";

dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};

app.post("/api/signup", async (req, res) => {
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

// Implemented a new POST endpoint for user login in the Express.js application. Users can authenticate by providing their email and password. If the provided email and password match a user in the database, the API responds with a success message and the user's data. If the credentials are invalid, an appropriate error message is returned.

app.post("/api/logins", async (req, res) => {
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

//course api for add course

app.post('/api/courses', async(req,res)=>{
  const {name,description,price,image,duration} = req.body;

  const newCourse = new Course({
    name:name,
    description:description,
    price:price,
    image:image,
    duration:duration
  }) 

  try{
    const saveCourse = await newCourse.save();
  
    res.json({
      success:true,
      data:saveCourse,
      message:'Course added Successfully.'
    })
  }
  catch(error){
    res.json({
      success:false,
      message:'Course not added.'
    })  }
})


//get /api/course/:id

app.get("/api/course/:id",async(req,res)=>{
  const {id} = req.params;

  try{
    const findCourse = await Course.findById({_id : id})
  
    res.json({
      success: true,
      data: findCourse,
      message:"Course find successfully using ID"
    })

  }catch(err){
    res.json({
      success: false,
      message:"Course not fetch."
    })
  }
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on PORT  ${PORT}`);
  connectDB();
});
