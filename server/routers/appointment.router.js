const Router = require('express').Router;
const appointmentController = require('../controllers/appointment.controller');
const validator = require('../validators/appointment.validator');

const appointmentRouter = new Router();

// sukuriam nauja vizita
appointmentRouter.post(
  '/',
  validator.newAppointment,
  appointmentController.newAppointment
);

// visi vizitai
appointmentRouter.get('/', appointmentController.getAllAppointments);

// vizitai pagal naudotojo id
appointmentRouter.get('/:id', appointmentController.getUserAppointments);

// istrinam vizita
appointmentRouter.delete('/:id', appointmentController.deleteAppointment);

// atnaujinam vizita
appointmentRouter.patch('/:id', appointmentController.updateAppointment);

module.exports = appointmentRouter;
