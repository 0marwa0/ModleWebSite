const experss = require("express");
const Route = experss.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modules/Users");
const multer = require("multer");
const uuidv4 = require("uuidv4");
const GridFsStorage = require("gridfs-stream");

Route.use(cors());
process.env.SECERET_KEY = "seceret";
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4 + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

Route.post("/add-user", (req, res) => {
  const userData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    familyName: req.body.familyName,
    email: req.body.email,
    password: req.body.password,
    supervisorName: req.body.supervisorName,
    study: req.body.study,
    extraMaterials: req.body.extraMaterials,
    material2: req.body.material2,
    department: req.body.department,
    imgUrl: req.body.imgUrl,
    role: req.body.role,
    stage: req.body.stage,
    MT: req.body.MT,
  });

  userData
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "done with adding",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

Route.post("/ueser-register", upload.single("imgUrl"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const userData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    familyName: req.body.familyName,
    email: req.body.email,
    password: req.body.password,
    supervisorName: req.body.supervisorName,
    study: req.body.study,
    extraMaterials: req.body.extraMaterials,
    material2: req.body.material2,
    department: req.body.department,
    imgUrl: url + "/public/" + req.file.filename,
    role: req.body.role,
    MT: req.body.MT,
  });
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "registered!" });
            })
            .catch((err) => res.send("error:" + err));
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => res.send("error:" + err));
});

Route.get("/getAvailableLecturer/:role", (req, res) => {
  User.find({ role: req.params.role })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.json("nothig to show");
      }
    })
    .catch((err) => res.send({ error: "Nothing fond" }));
});

Route.put("/memo/:id", (req, res) => {
  console.log(req.body.MT);

  User.findByIdAndUpdate(req.params.id, {
    $set: { MT: req.body.MT },
  }).then(() => {
    User.findOne({ _id: req.params.id }).then((data) => {
      res.send(data);
    });
  });
});

Route.post("/Login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,

            firstName: user.firstName,
            lastName: user.lastName,
            familyName: user.familyName,
            email: user.email,
            password: user.password,
            supervisorName: user.supervisorName,
            study: user.study,
            extraMaterials: user.extraMaterials,
            material2: user.material2,
            department: user.department,
            imgUrl: user.imgUrl,
            role: user.role,
          };
          let token = jwt.sign(payload, process.env.SECERET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => res.send("error" + err));
});

Route.get("/profile", (req, res) => {
  let decoded = jwt.verify(
    req.headers[("authorization", process.env.SECERET_KEY)]
  );
  User.findOne({ _id: decoded._id })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => res.send("error:" + err));
});
module.exports = Route;
