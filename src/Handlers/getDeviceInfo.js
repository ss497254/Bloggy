const uaparser = require("ua-parser-js");
const { adlog } = require("./Logger").addLogs("user-agent");

module.exports = (req) => {
  let agent = uaparser(req.headers["user-agent"]);
  let logobj = {
    ip:
      req.headers["cf-connecting-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.ip ||
      "255.255.255.255",
    agent:
      agent.os.name +
      " " +
      agent.os.version +
      " " +
      agent.browser.name +
      " " +
      agent.browser.version,
  };
  if (agent.device.vendor) {
    logobj.device =
      agent.device.vendor + " " + agent.device.model + " " + agent.device.type;
  }
  adlog(logobj, true);
  return logobj;
};
