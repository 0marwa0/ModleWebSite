const experss = require("express");
const ExamRoute = experss.Router();
const cors = require("cors");
const Exams = require("../modules/Exam");

ExamRoute.use(cors());
process.env.SECERET_KEY = "seceret";
ExamRoute.get("/getExam/:CourseName/", (req, res) => {
  console.log(req.params.CourseName);

  Exams.find({ courseName: req.params.CourseName })
    .then((data) => {
      if (data) {
        res.json(data);
        console.log();
      } else {
        res.json("nothig to show");
      }
    })
    .catch((err) => res.send({ error: "Nothing fond" }));
});

ExamRoute.post("/addExam", (req, res) => {
  const Exam = new Exams({
    courseName: req.body.courseName,
    question: req.body.question,
    answers: req.body.answers,
    correct: req.body.correct,
  });

  Exams.create(Exam)
    .then((result) => {
      res.status(201).json({
        message: "done with adding",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// ExamRoute.put("/updateCourse/:id", (req, res) => {
//   console.log(req.params.id);

//   Course.findByIdAndUpdate(req.params.id, {
//     $set: { data: req.body.data },
//   }).then(() => {
//     Course.findOne({ StuId: req.body.id }).then((data) => {
//       res.send(data);
//     });
//   });
// });

module.exports = ExamRoute;
