const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exam = new Schema({
  courseName: { type: String },

  question: { type: String },
  answers: [],
  correct: { type: Number },
});

module.exports = mongoose.model(`Exam`, Exam);
