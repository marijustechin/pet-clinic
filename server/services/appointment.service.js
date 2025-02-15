const sequelize = require('../db');
const { appointment, user } = sequelize.models;
const appointmentDto = require('../dtos/appointment.dto');
const ApiError = require('../exceptions/api.error');

class AppointmentService {
  async newAppointment(pet_name, date, time, notes, user_id) {
    let appointmentNew = await appointment.create({
      pet_name,
      date,
      time,
      notes,
      user_id,
    });

    const currentUser = await user.findOne({ where: { id: user_id } });

    appointmentNew.user = { first_name: currentUser.first_name };

    const appointmentData = new appointmentDto(appointmentNew);

    return appointmentData;
  }

  async getAllAppointments(page = 1, per_page = 3) {
    // su postgres nebutina,
    // o su mariaDB/mysql sitie parametrai
    // PRIVALO buti skaiciaus tipo, nes mes sintakses klaida
    const pageInt = Number(page);
    const per_pageInt = Number(per_page);
    const result = await appointment.findAndCountAll({
      include: {
        model: user,
        as: 'user',
        attributes: ['first_name'],
      },
      limit: per_pagee,
      offset: (pageInt - 1) * per_pageInt,
    });
    const appointments = result.rows;

    let appointmentsData = [];

    for (const singleAppointment of appointments) {
      const appointmentData = new appointmentDto(singleAppointment);
      appointmentsData.push(appointmentData);
    }

    return { items: appointmentsData, total: result.count };
  }

  async getUserAppointments(user_id, page = 1, per_page = 3) {
    // su postgres nebutina,
    // o su mariaDB/mysql sitie parametrai
    // PRIVALO buti skaiciaus tipo, nes mes sintakses klaida
    const pageInt = Number(page);
    const per_pageInt = Number(per_page);
    const result = await appointment.findAndCountAll({
      where: { user_id },
      include: {
        model: user,
        as: 'user',
        attributes: ['first_name'],
      },
      limit: per_pageInt,
      offset: (pageInt - 1) * per_pageInt,
    });

    const userAppointments = result.rows;

    let appointmentsData = [];

    for (const singleAppointment of userAppointments) {
      const appointmentData = new appointmentDto(singleAppointment);
      appointmentsData.push(appointmentData);
    }

    return { items: appointmentsData, total: result.count };
  }

  async deleteAppointment(id) {
    const deleted = await appointment.destroy({ where: { id } });

    return deleted;
  }

  async updateAppointment(id, updateData) {
    const updated = await appointment.update(updateData, {
      where: { id },
    });

    if (!updated) {
      throw ApiError.BadRequest('Tokių įrašų nepavyko rasti');
    }

    return updated;
  }
}

module.exports = new AppointmentService();
