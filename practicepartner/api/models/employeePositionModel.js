const mongoose = require("mongoose");

const employeePositionSchema = new mongoose.Schema({
  employeePositionName: {
    type: String,
    required: true,
  },
  employeePositionDescription: {
    type: String,
    required: false,
  },
});

const EmployeePosition = mongoose.model(
  "EmployeePosition",
  employeePositionSchema
);

module.exports = EmployeePosition;
