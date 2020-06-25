const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MTSchema = new Schema({
  val: { type: Number },
  lable: { type: String },
  items: [
    (parentVal = { type: Number }),
    (val = { type: Number }),
    (lable = { type: String }),
    (MTcode = {
      type: String,
    }),
    (MTroom = {
      type: Number,
    }),
    (MTunit = {
      type: Number,
    }),
  ],
});

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  familyName: { type: String },
  email: { type: String },
  password: { type: String },
  supervisorName: { type: String },
  study: { type: String },
  extraMaterials: { type: String },
  material2: { type: String },
  department: { type: String },
  imgUrl: { type: String },
  role: { type: String },

  MT: [MTSchema],
});

const UesrRequest = mongoose.model(`usersRequest`, UserSchema);
module.exports = UesrRequest;
