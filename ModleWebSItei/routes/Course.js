const experss = require("express");
const Route = experss.Router();
const cors = require("cors");
const Course = require("../modules/Course");

Route.use(cors());
process.env.SECERET_KEY = "seceret";
Route.get("/getCoruse/", (req, res) => {
  Course.find({})
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json("nothig to show");
      }
    })
    .catch((err) => res.send({ error: "Nothing fond" }));
});

Route.post("/addCourse", (req, res) => {
  const course = new Course({
    StuId: req.body.id,
    data: req.body.data,
  });

  Course.create(course)
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

Route.put("/updateCourse/:id", (req, res) => {
  console.log(req.params.id);

  Course.findByIdAndUpdate(req.params.id, {
    $set: { data: req.body.data },
  }).then(() => {
    Course.findOne({ StuId: req.body.id }).then((data) => {
      res.send(data);
    });
  });
});

module.exports = Route;
