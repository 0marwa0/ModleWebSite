const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TSSchema = new Schema({
  ST: { type: String },
  STName: { type: String },
  STLect: { type: String },
  STDay: { type: String },
  STTime: { type: String },
  data: [],
});

const TSRequest = mongoose.model(`STRequest`, TSSchema);
module.exports = TSRequest;
