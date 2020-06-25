let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  uuidv4 = require("uuidv4"),
  router = express.Router();
const bcrypt = require("bcrypt");
// User model
let User = require("../modules/UserRequest");

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

router.get("/getUserRequest", (req, res) => {
  User.find().then((users) =>
    res.json(users).catch((error) => res.send(error))
  );
});

router.get("/getUser/:id", (req, res) => {
  User.find({ _id: req.params.id })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.send(error));
});
router.delete("/deleteUserRequest/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((users) => console.log("done"))
    .catch((err) => console.log(err));
});

// router.put("/memo/:id", (req, res) => {
//   User.findByIdAndUpdate({ _id: req.params.id }, { MT: req.body.MT }).then(
//     () => {
//       User.findOne({ _id: req.params.id }).then((data) => {
//         res.send(data);
//       });
//     }
//   );
// });

router.post("/ueser-request", upload.single("imgUrl"), (req, res, next) => {
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

module.exports = router;
