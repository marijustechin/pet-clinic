const Router = require("express").Router;
const appointmentController = require("../controllers/appointment.controller");
const validator = require("../validators/appointment.validator");

const appointmentRouter = new Router();

// sukuriam nauja vizita
appointmentRouter.post(
  "/",
  validator.newAppointment,
  appointmentController.newAppointment
);

// vizitai pagal naudotojo id
appointmentRouter.get("/:id", appointmentController.getUserAppointments);

module.exports = appointmentRouter;
