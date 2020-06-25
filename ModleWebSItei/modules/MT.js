var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var MT = new Schema({
  MTcode: {
    type: String,
  },
  MTname: {
    type: String,
  },
  MTlecturer: {
    type: String,
  },
  MTroom: {
    type: [Number],
  },
  MTpoint: {
    type: [Number],
  },
});

module.exports = mongoose.model("MT", MT);
