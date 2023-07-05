var express = require("express");
var router = express.Router();

var html = `
  <h1>Welcome To The Mentor 👨🏻‍🏫 & Student 👨🏻‍🎓 Assigning With The Database  </h1>
  <p>Create a Mentor : POST - "/mentor" *name email required*</p>
  <p>Create a Student : POST - "/student" *name age required*</p>
  <p>Assign a Student For A Mentor : PUT - "/mentor/:mentorId/student/:studentId"</p>
  <p>Assign Or Change The Mentor for a Student : PUT - "/student/:studentId/mentor/:mentorId"</p>
  <p>Show all Students for a Mentor : GET - "/mentor/:mentorId/student"</p>
  <p>Show the previously assigned Mentor for a Student : GET - "/student/:studentId/mentor"</p>
`;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(html);
});

module.exports = router;
