const { validationResult } = require("express-validator");
const appointmentService = require("../services/appointment.service");

class AppointmentController {
  async newAppointment(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Validation errors: ", errors.array());
      return;
    }

    const { pet_name, date, time, user_id, notes } = req.body;

    const appointmentNew = await appointmentService.newAppointment(
      pet_name,
      date,
      time,
      notes,
      user_id
    );

    res.status(200).json(appointmentNew);
  }

  // appointmentai pagal userio id
  async getUserAppointments(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Validation errors: ", errors.array());
      return;
    }

    const { id } = req.params;

    const userAppointments = await appointmentService.getUserAppointments(id);

    res.status(200).json(userAppointments);
  }
}

module.exports = new AppointmentController();
