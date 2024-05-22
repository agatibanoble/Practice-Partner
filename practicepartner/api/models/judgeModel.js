const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const judgeSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Court", // Reference to the Court model
  },
});

const Judge = mongoose.model("Judge", judgeSchema);

module.exports = Judge;
