const fs = require("fs");
const { join } = require("path");
const { mongoDB } = require("../DB/mongoDB");
const formatTime = require("./formatTime");

const logPath = join(__dirname, "..", "..", "App", "log");
const startTime =
  new Date().getTime() + (process.env.TIMEDIFF || 0) * 60 * 60 * 1000;

function setup() {
  fs.writeFileSync(logPath, `[{"start":"Hii, I'm logs"}`);
}

function append_log(event, data) {
  let jsonstring =
    ',{"event":' +
    JSON.stringify(event) +
    ',"log":' +
    JSON.stringify(data) +
    "}";
  fs.appendFileSync(logPath, jsonstring);
}

function read_logs() {
  let data = fs.readFileSync(logPath).toString() + "]";
  return JSON.parse(data);
}

const addLogs = (event) => {
  const debug = require("debug")(event);
  function adlog(message, save_to_db) {
    let currTime = new Date(
      new Date().getTime() + (process.env.TIMEDIFF || 0) * 60 * 60 * 1000
    );
    const log = {
      message,
      time: formatTime((currTime.getTime() - startTime) / 1000),
      timestamp: `${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()} <--> ${currTime.toLocaleDateString()}`,
    };
    debug(log);
    append_log(event, log);
    if (save_to_db) save_to_DB(event, log);
  }

  function read_log() {
    let data = read_logs();
    data = data.filter((item) => item.event == event);
    return data;
  }

  async function save_to_DB(event, { message, timestamp, time }) {
    await mongoDB()
      .collection("logs-" + event)
      .insertOne({
        ...(typeof message == Object ? message : { message }),
        timestamp,
        time,
      });
  }

  return {
    adlog,
    read_log,
  };
};
module.exports = { addLogs, read_logs, setup };
