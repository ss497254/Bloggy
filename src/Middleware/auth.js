const jwt = require("jsonwebtoken");
const { BloggyError } = new (require("../Handlers/ServerError"))("middleware");
const getDeviceInfo = require("../Handlers/getDeviceInfo");
const { findUserByToken } = require("../Dao/user");

const auth = async (req, res, next) => {
  // console.log("headers", req.headers?.authorization);
  // console.log("query", req.query);
  // console.log("body", req.body);

  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw BloggyError(
        401,
        "Unauthorized",
        `endpoint: ${req.baseUrl} no authorization header found`
      );
    const token = authorization.split(" ");
    if (token[0].trim() !== "Bearer")
      return next(
        new BloggyError(400, "Invalid Token", "Incorrect token type")
      );

    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    const user = await findUserByToken(decoded.id, token[1]);

    if (!user || decoded.deviceInfo != getDeviceInfo(req).agent) {
      throw BloggyError(401, "Invalid Token", "Incorrect token type");
    }

    req.user = user;
    next();
  } catch (e) {
    return next(e);
  }
};

module.exports = auth;
