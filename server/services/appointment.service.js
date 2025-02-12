const sequelize = require("../db");
const { appointment } = sequelize.models;
const appointmentDto = require("../dtos/appointment.dto");

class AppointmentService {
  async newAppointment(pet_name, date, time, notes, user_id) {
    const appointmentNew = await appointment.create({
      pet_name,
      date,
      time,
      notes,
      user_id,
    });

    const appointmentData = new appointmentDto(appointmentNew);

    return appointmentData;
  }

  async getUserAppointments(user_id) {
    const userAppointments = await appointment.findAll({ where: { user_id } });

    let appointmentsData = [];

    for (const singleAppointment of userAppointments) {
      const appointmentData = new appointmentDto(singleAppointment);
      appointmentsData.push(appointmentData);
    }

    return appointmentsData;
  }
}

module.exports = new AppointmentService();
