const { validationResult } = require('express-validator');
const appointmentService = require('../services/appointment.service');
const ApiError = require('../exceptions/api.error');

class AppointmentController {
  async newAppointment(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('Validation errors: ', errors.array());
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

  // visi vizitai
  async getAllAppointments(req, res, next) {
    const { page, per_page } = req.query;
    const allAppointments = await appointmentService.getAllAppointments(
      page,
      per_page
    );

    res.status(200).json(allAppointments);
  }

  // appointmentai pagal userio id
  async getUserAppointments(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('Validation errors: ', errors.array());
      return;
    }

    const { id } = req.params;
    const { page, per_page } = req.query;

    const userAppointments = await appointmentService.getUserAppointments(
      id,
      page,
      per_page
    );

    res.status(200).json(userAppointments);
  }

  async deleteAppointment(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('Validation errors: ', errors.array());
      return;
    }

    const { id } = req.params;

    const deleted = appointmentService.deleteAppointment(id);

    res.status(200).json(deleted);
  }

  async getAppointmentById(req, res, next) {
    const { id } = req.params;

    const item = await appointmentService.getAppointmentById(id);

    return res.status(200).json(item);
  }

  async updateAppointment(req, res, next) {
    const { id } = req.params;
    const updates = req.body;

    // jei body tuscias ir nera nei vieno lauko
    if (!Object.keys(updates).length) {
      throw ApiError.BadRequest('Nepateiktas nei vienas laukas');
    }

    const updated = await appointmentService.updateAppointment(id, updates);

    return res.status(200).json(updated);
  }
}

module.exports = new AppointmentController();
