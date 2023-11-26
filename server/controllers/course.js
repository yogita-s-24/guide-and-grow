import Course from "../models/Course.js";

const postApiCourse = async (req, res) => {
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
  }

  const getApiCourseId = async (req, res) => {
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
  }

  const deleteApiCourse = async (req, res) => {
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
  }

  const putApiCourse = async (req, res) => {
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
  }

  export {postApiCourse, getApiCourseId, deleteApiCourse, putApiCourse};