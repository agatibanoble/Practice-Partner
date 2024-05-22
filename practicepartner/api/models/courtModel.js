const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courtSchema = new Schema({
  courtName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  presidingJudge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge", // Reference to the Judges model
    required: false,
  },
});

const Court = mongoose.model("Court", courtSchema);

module.exports = Court;
