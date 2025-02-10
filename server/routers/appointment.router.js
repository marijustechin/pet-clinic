const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const validator = require("../validators/user.validator");

const appointmentRouter = new Router();

// naudotoju sarasas - gali gauti tik autorizuoti naudotojai
appointmentRouter.get("/", userController.getAll);
// naudotojas paga id
appointmentRouter.get("/:id", userController.getUserById);

// sukuriam nauja
appointmentRouter.post("/", validator.register, userController.register);

// prisijungimas
appointmentRouter.post("/login", validator.login, userController.login);

// atsijungimas
appointmentRouter.post("/logout", userController.logout);

// refresh token
appointmentRouter.post("/refresh", userController.refresh);

// naudotojo modifikavimas
appointmentRouter.put("/:id", userController.updateUser);

// istrinam
appointmentRouter.delete("/:id", userController.deleteUser);

module.exports = appointmentRouter;
