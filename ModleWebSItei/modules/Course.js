var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var Course = new Schema({
  StuId: {
    type: String,
  },
  data: [],
});

module.exports = mongoose.model("Coures", Course);
