const { body, param } = require("express-validator");

exports.newAppointment = [
  body("pet_name").trim(),
  body("date").trim(),
  body("time").trim(),
  body("notes").trim(),
  body("user_id").trim(),
];

exports.userAppointments = [param("id").trim().toInt().isNumeric()];
