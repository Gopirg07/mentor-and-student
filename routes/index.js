var express = require("express");
var router = express.Router();

var html = `
  <h1>  Mentor 👨🏻‍🏫 & Student 👨🏻‍🎓 Assigning With The Database  </h1>
  <p>To Create a Mentor : POST - "/mentor" *name email required*</p>
  <p>To Create a Student : POST - "/student" *name age required*</p>
  <p>To Assign a Student to Mentor : PUT - "/mentor/:mentorId/student/:studentId"</p>
  <p>Assign Or Change The Mentor for a Student : PUT - "/student/:studentId/mentor/:mentorId"</p>
  <p>show all students for a particular mentor : GET - "/mentor/:mentorId/student"</p>
  <p>show the previously assigned mentor for a particular student. : GET - "/student/:studentId/mentor"</p>
`;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(html);
});

module.exports = router;
