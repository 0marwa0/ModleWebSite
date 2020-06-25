const experss = require("express");
const app = experss();
const Users = require("./modules/Users");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Grid = require("gridfs-stream");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");
var bodyParser = require("body-parser");
const api = require("./routes/RequestUserRoute");
const STRoute = require("./routes/ST");
const UsersRoute = require("./routes/User");
const CourseRoute = require("./routes/Course");
const ExamRoute = require("./routes/ExamRoute");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride(`_method`));
app.listen(7000, () => {
  console.log("working on 7000 port");
});
let gfs;

mongoose.connect("mongodb://localhost/DataStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection(`uploads`);
});

app.use("/", api);
app.use("/", UsersRoute);
app.use("/", STRoute);
app.use("/", CourseRoute);
app.use("/", ExamRoute);

// POST REQUEST

app.use("/public", experss.static("public"));
// DELETE REQUEST
app.delete("/usres/:id", (req, res) => {
  Users.findByIdAndRemove({ _id: req.params.id }).then((data) => {
    res.send(data);
  });
});
// PUT REQUEST
app.put("/usres/:id", (req, res) => {
  Users.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Users.findOne({ _id: req.params.id }).then((data) => {
      res.send(data);
    });
  });
});

// GET REQUEST
app.get("/usres", (req, res) => {
  Users.find({}).then((data) => {
    res.send(data);
  });
});
// GET REQUEST based on geometry
// app.get("/usre", (req, res) => {
//   // Users.aggregate(
//   //   {
//   //     type: "Point",
//   //     coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
//   //   },
//   //   {
//   //     maxDistance: 100000,
//   //     spherical: true,
//   //   }
//   // ).then((data) => {
//   //   res.send(data);
//   // });
//   Users.find({ role: req.query.role }).then((data) => {
//     res.send(data);
//   });
// });
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});
