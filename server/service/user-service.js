const { User, Bid } = require("../db/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const mailService = require("../service/mail-service");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const { where } = require("sequelize");

class UserService {
  async registration(name, dateOfBirth, email, password, phone) {
    const candidate = await User.findOne({
      where: {
        email: email,
      },
    });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует.`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      fio: name,
      date_of_birth: dateOfBirth,
      email,
      password: hashPassword,
      phone,
      activationLink,
    });
    console.log("мой ", user.get());
    await mailService.sendActivationMail(email, `http://46.148.228.8/`);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден.");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw ApiError.BadRequest("Неверный пароль.");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllBids() {
    const bids = await Bid.findAll();
    return bids;
  }

  async activate(activationLink) {
    const user = await User.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw new Error("Некорректная ссылка активации.");
    }
    await User.update(
      { isActivated: true },
      { where: { activationLink: activationLink } }
    );
  }
}

module.exports = new UserService();
