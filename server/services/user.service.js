const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const { user, user_secret, role } = sequelize.models;
const ApiError = require("../exceptions/api.error");
const UserDto = require("../dtos/user.dto");
const tokenService = require("../services/token.service");

class UserService {
  async #getUserByEmail(email) {
    return await user.findOne({
      where: { email },
      include: user_secret,
    });
  }

  async #getRoleId() {
    const roleId = await role.findOne({ where: { role_name: "USER" } });

    if (roleId) {
      return roleId.id;
    } // nei nera, sukuriam
    else {
      const defaultRole = await role.create({ role_name: "USER" });

      return defaultRole.id;
    }
  }

  async registration(first_name, email, password) {
    // patikrinam ar pastas neuzimtas
    const existingEmail = await user.findOne({ where: { email } });

    if (existingEmail)
      throw ApiError.BadRequest(`El. pašto adresas ${email} jau naudojamas`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create(
      {
        first_name,
        email,
        role_id: await this.#getRoleId(),
        user_secret: [{ password: hashedPassword }],
      },
      {
        include: [user_secret],
      }
    );

    const userDto = await UserDto.init(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, userDto };
  }

  async getAllUsers() {
    const users = await user.findAll();

    let usersDto = [];
    let usr;

    for (const user of users) {
      usr = await UserDto.init(user);
      usersDto.push(usr);
    }

    return usersDto;
  }

  async getUser(id) {
    const foundUser = await user.findOne({ where: { id } });
    const userDto = new UserDto(foundUser);
    return userDto;
  }

  async userlogin(email, password) {
    const activeUser = await this.#getUserByEmail(email);
    if (!activeUser)
      throw ApiError.BadRequest(
        `Neteisingas el. pašto adresas arba slaptažodis`
      );

    // Čia turi buti patikrinimas, ar naudotojas aktyvavo savo paskyrą

    const valid = await bcrypt.compare(
      password,
      activeUser.user_secret.password
    );

    if (!valid) {
      throw ApiError.BadRequest(
        `Neteisingas el. pašto adresas arba slaptažodis`
      );
    }

    const userDto = await UserDto.init(activeUser);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logoutUser(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const activeUser = await user.findOne({ where: { id: userData.id } });

    const userDto = new UserDto(activeUser);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async userUpdate(id, data) {
    const foundUser = await user.findOne({ where: { id } });

    if (!foundUser) throw ApiError.BadRequest("Naudotojas tokiu Id nerastas");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await foundUser.update(data);
    await foundUser.save();

    return new UserDto(foundUser);
  }

  async deleteUser(id) {
    const foundUser = await user.findOne({ where: { id } });

    if (!foundUser) throw ApiError.BadRequest("Naudotojas tokiu Id nerastas");

    await foundUser.destroy();

    return { success: "success" };
  }
}

module.exports = new UserService();
