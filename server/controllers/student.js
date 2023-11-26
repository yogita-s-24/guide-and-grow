import Student from "../models/Student.js";
const postApiStudent = async (req, res) => {
  const { name, email, mobileNo, parentNo, birthDate, collegename, city } =
    req.body;
  const student = new Student({
    name: name,
    email: email,
    mobileNo: mobileNo,
    parentNo: parentNo,
    birthDate: birthDate,
    collegename: collegename,
    city: city,
  });

  try {
    const savedStudent = await student.save();
    res.status(201).json({
      success: true,
      data: savedStudent,
      message: "Student saved successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

export { postApiStudent };