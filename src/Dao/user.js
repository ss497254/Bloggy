const { ObjectID } = require("mongodb");
const { mongoDB } = require("../DB/mongoDB");
const { BloggyError } = new (require("../Handlers/ServerError"))("Database");
// const { updateAuthEmail } = require("../handlers/auth");

const UserTable = mongoDB().collection("users");

async function isEmailAvailable(Email) {
  const user = await UserTable.findOne({ Email });
  if (user) {
    return false;
  } else {
    return true;
  }
}

async function getUser(Email) {
  const user = await UserTable.findOne({ Email });
  if (!user) throw BloggyError(404, "User not found", "get user");
  return user;
}

async function getUserById(id) {
  const user = await UserTable.findOne({ _id: ObjectID(id) });
  if (!user) throw BloggyError(404, "User not found", "get userByID");
  return user;
}

async function addUser(data) {
  let EmailAvailable = await isEmailAvailable(data.Email);
  if (!EmailAvailable) throw BloggyError(400, "User already exists", "addUser");
  return await UserTable.insertOne({ ...data, addedAt: Date.now() });
}

async function updateUserCred(id, { Email, Password }) {
  let EmailAvailable = await isEmailAvailable(Email);
  if (!EmailAvailable)
    throw BloggyError(400, "Email is in use", "update user cred");

  // await updateAuthEmail(Email);
  if (Password)
    return await UserTable.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { Email, Password } }
    );
  else
    return await UserTable.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { Email } }
    );
}

async function updateUserData(id, data) {
  return await UserTable.findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: { ...data } }
  );
}

async function deleteUser(id) {
  return await UserTable.deleteOne({ _id: ObjectID(id) });
}

async function clearToken(id) {
  return await UserTable.updateOne(
    { _id: ObjectID(id) },
    { $set: { Token: [] } }
  );
}

async function addToken(id, token) {
  await UserTable.updateOne(
    { _id: ObjectID(id) },
    { $push: { Tokens: token } }
  );
}

async function findUserByToken(id, token) {
  const user = await getUserById(ObjectID(id));
  if (!user) throw BloggyError(404, "User not found", "find user by token");
  if (user.Tokens.indexOf(token) === -1)
    throw BloggyError(404, "token not found", "find user by token");
  return user;
}

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUserCred,
  updateUserData,
  deleteUser,
  addToken,
  findUserByToken,
  clearToken,
};
