var express = require("express");
var router = express.Router();
var { Mentor, Student } = require("../schemas/schemas");

/* GET users listing. */
router.get("/", async (req, res) => {
  res.send("respond with a resource");
});

// POST request to create a mentor

router.post("/mentor", async (req, res) => {
  try {
    // creating a new mentor
    const { name, email } = req.body;  
    const mentor = await Mentor.create({ name, email });  
    res.status(201).json({ mentor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// POST request to create a student
router.post("/student", async (req, res) => {
  try {
    // creating a new student
    const { name, age } = req.body;  
    const student = await Student.create({ name, age });  
    res.status(201).json({ student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT request to assign a student to a mentor 
router.put("/mentor/:mentorId/student/:studentId", async (req, res) => {
  try {
    //assigning a student to a mentor
    const { mentorId, studentId } = req.params; 
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ message: "Mentor or student not found" });
    }
    //If the student already has a mentor, return a 400 status code that the student already has a mentor.

    if (student.mentor) {
      return res.status(400).json({ message: "Student already has a mentor" });
    }
    // If both the mentor and student documents are found and the student does not have a mentor, assign the student to the mentor.
    mentor.students.push(studentId);
    student.mentor = mentorId;

    await mentor.save();
    await student.save();

    res.status(200).json({ message: "Student assigned to mentor" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// PUT request to assign/change a mentor for a student
router.put("/student/:studentId/mentor/:mentorId", async (req, res) => {
  try {
    //changing a mentor for a student
    const { studentId, mentorId } = req.params; 
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ message: "Mentor or student not found" });
    }
    if (student.mentor) {
      const prevMentor = await Mentor.findById(student.mentor);
      prevMentor.students = prevMentor.students.filter((id) => id != studentId);
      student.previousMentor.push(prevMentor);
      // await prevMentor.save();
    }

    mentor.students.push(studentId);
    student.mentor = mentorId;

    await mentor.save();
    await student.save();

    res.status(200).json({ message: "Student assigned to mentor" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET request to show all students for a mentor  
router.get("/mentor/:mentorId/student", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate("students");

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json({ students: mentor.students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET request to show the previously assigned mentor for a student

router.get("/student/:studentId/mentor", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("mentor");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const prevMentor = student.previousMentor;

    res.status(200).json({ mentor: prevMentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
