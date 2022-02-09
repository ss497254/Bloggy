const UserDao = require("../Dao/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getDeviceInfo = require("../Handlers/getDeviceInfo");

async function fetchUser(req, res, next) {
  try {
    const { _id: id, FirstName, LastName, Email } = req.user;
    return res.status(200).send({ user: { id, FirstName, LastName, Email } });
  } catch (e) {
    return next(e);
  }
}

async function getUser(req, res, next) {
  const { Email, Password } = req.body;
  const deviceInfo = getDeviceInfo(req).agent;
  if (Email && Password) {
    try {
      const {
        _id: id,
        FirstName,
        LastName,
        Password: UserPassword,
      } = await UserDao.getUser(Email);

      const isMatch = await bcrypt.compare(Password, UserPassword);

      if (!isMatch) {
        return res.status(401).json({ error: "Failed to login" });
      }

      const token = jwt.sign({ id, deviceInfo }, process.env.JWT_SECRET);
      UserDao.addToken(id, token);
      return res
        .status(200)
        .send({ user: { id, FirstName, LastName, Email }, token });
    } catch (e) {
      return next(e);
    }
  } else {
    return res.status(404).json({ error: "No Token" });
  }
}

async function addUser(req, res, next) {
  let { FirstName, LastName, Email, Password } = req.body;
  Password = await bcrypt.hash(Password, 8);
  const deviceInfo = getDeviceInfo(req).agent;

  try {
    const { ops } = await UserDao.addUser({
      FirstName,
      LastName,
      Email,
      Password,
    });
    if (!ops) {
      throw new Error("Unable to create user");
    }
    const { _id: id } = ops[0];
    const token = jwt.sign({ id, deviceInfo }, process.env.JWT_SECRET);
    UserDao.addToken(id, token);
    return res
      .status(201)
      .send({ user: { FirstName, LastName, Email, id }, token });
  } catch (e) {
    return next(e);
  }
}

async function updateCred(req, res, next) {
  let { Email, Password } = req.body;
  if (Password) Password = await bcrypt.hash(Password, 8);

  try {
    const user = await UserDao.updateUserCred(req.user.id, { Email, Password });
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
}

async function updateData(req, res, next) {
  try {
    const user = await UserDao.updateUserData(req.user.id, req.body);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    await UserDao.deleteUser(req.user.id);
    return res.status(202);
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  fetchUser,
  getUser,
  addUser,
  updateCred,
  updateData,
  deleteUser,
};
