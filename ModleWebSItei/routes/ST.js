const experss = require("express");
const Route = experss.Router();
const cors = require("cors");
const ST = require("../modules/ST");

Route.use(cors());
process.env.SECERET_KEY = "seceret";
Route.get("/getST/:st", (req, res) => {
  ST.find({ ST: req.params.st })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json("nothig to show");
      }
    })
    .catch((err) => res.send({ error: "Nothing fond" }));
});

Route.post("/addST", (req, res) => {
  const STData = new ST({
    ST: req.body.ST,
    STName: req.body.STcontent,
    STLect: req.body.STLect,
    STDay: req.body.STDay,
    STTime: req.body.STTime,
    data: req.body.data,
  });
  console.log(req.body.STName);

  ST.create(STData)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "done with adding",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

Route.put("/UpdateST/:id", (req, res) => {
  console.log(req.body, "dodo");

  ST.findByIdAndUpdate(req.params.id, {
    $set: { data: [req.body] },
  }).then(() => {
    ST.findOne({ _id: req.params.id }).then((data) => {
      res.send(data);
    });
  });
});
Route.delete("/DeleteST/:id", (req, res) => {
  ST.findByIdAndDelete(req.params.id).then(() => {
    res.send("Don with delete");
  });
});
module.exports = Route;
