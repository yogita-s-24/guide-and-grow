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

const putApiStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, parentNo, birthDate, collegename, city } =
    req.body;
  await Student.updateOne(
    { _id: id },
    { $set: { name, email, mobileNo, parentNo, birthDate, collegename, city } }
  );
  try {
    const updateStudent = await Student.findOne({ _id: id });
    res.status(200).json({
      success: true,
      data: updateStudent,
      message: "Student updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const patchApiStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, parentNo, birthDate, collegename, city } =
    req.body;
  await Student.updateOne(
    { _id: id },
    { $set: { name, email, mobileNo, parentNo, birthDate, collegename, city } }
  );
  try {
    const updateStudent = await Student.findOne({ _id: id });
    res.status(200).json({
      success: true,
      data: updateStudent,
      message: "Student updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { postApiStudent, putApiStudent, patchApiStudent};