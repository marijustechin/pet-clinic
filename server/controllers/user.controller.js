const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const ApiError = require("../exceptions/api.error");

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      const { first_name, email, password } = req.body;

      const newUser = await userService.registration(
        first_name,
        email,
        password
      );

      res.status(200).json({
        data: newUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      const { email, password } = req.body;

      const loggedUser = await userService.userlogin(email, password);

      // refreshToken dedam i cookies
      res.cookie("refreshToken", loggedUser.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        // httpOnly pasako serveriui, kad cookie esanti informacija
        // neturi buti siunciama uz serverio ribu
        // ir kad serveris turi nerodyti, kas viduje
        httpOnly: true,
      });

      res.status(200).json(loggedUser);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken)
        throw ApiError.UnauthorizedError("Neprisijungęs naudotojas");

      const token = await userService.logoutUser(refreshToken);

      res.clearCookie("refreshToken");

      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken)
        throw ApiError.UnauthorizedError("Neprisijungęs naudotojas");

      const userData = await userService.refresh(refreshToken);

      // refreshToken dedam i cookies
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        // httpOnly pasako serveriui, kad cookie esanti informacija
        // neturi buti siunciama uz serverio ribu
        // ir kad serveris turi nerodyti, kas viduje
        httpOnly: true,
      });

      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      const user = await userService.getUser(req.params.id);

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return;
      }

      const updatedUser = await userService.userUpdate(req.params.id, req.body);

      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      return res.status(200).json(deletedUser);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
