import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//import here all api controllers
import { postApiSignup, postApiLogin } from "./controllers/user.js";
import {
  postApiCourse,
  getApiCourseId,
  deleteApiCourse,
  putApiCourse,
} from "./controllers/course.js";

import {postApiStudent} from "./controllers/student.js"

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

app.post("/api/courses", postApiCourse);

//get /api/course/:id

app.get("/api/course/:id", getApiCourseId);

//DELETE - /api/course/:id

app.delete("/api/course/:id", deleteApiCourse);

// put api for courses

app.put("/api/courses/:id", putApiCourse);

// post api for add students
app.post("/api/students", postApiStudent);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on PORT  ${PORT}`);
  connectDB();
});
