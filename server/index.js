import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Course from "./models/Course.js";

dotenv.config();

//import here all api controllers
import { postApiSignup, postApiLogin } from "./controllers/user.js";

const app = express();
app.use(express.json());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};

app.post("/api/signups", postApiSignup);

// Implemented a new POST endpoint for user login in the Express.js application. Users can authenticate by providing their email and password. If the provided email and password match a user in the database, the API responds with a success message and the user's data. If the credentials are invalid, an appropriate error message is returned.

app.post("/api/logins", postApiLogin);

//course api for add course

app.post("/api/courses", async (req, res) => {
  const { name, description, price, image, duration } = req.body;

  const newCourse = new Course({
    name: name,
    description: description,
    price: price,
    image: image,
    duration: duration,
  });

  try {
    const saveCourse = await newCourse.save();

    res.json({
      success: true,
      data: saveCourse,
      message: "Course added Successfully.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Course not added.",
    });
  }
});

//get /api/course/:id

app.get("/api/course/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const findCourse = await Course.findById({ _id: id });

    res.json({
      success: true,
      data: findCourse,
      message: "Course find successfully using ID",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Course not fetch.",
    });
  }
});

//DELETE - /api/course/:id

app.delete("/api/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Course.deleteOne({ _id: id });

    res.json({
      success: true,
      message: "Course deleted Successfully.",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Course not deleted.",
    });
  }
});

// put api for courses

app.put("/api/courses/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, img, duration } = req.body;
  await Course.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        price: price,
        description: description,
        img: img,
        duration: duration,
      },
    }
  );

  const updateCourses = await Course.findOne({ _id: id });

  res.json({
    success: true,
    data: updateCourses,
    message: "Course updated successfully",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on PORT  ${PORT}`);
  connectDB();
});
