const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const expressStaticGzip = require("express-static-gzip");
const { BloggyError: ServerError } = new (require("./Handlers/ServerError"))(
  "server"
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const publicFolder = join(__dirname, "..", "client", "build");
const API_URL = "/api";

if (process.env.API_URL_OVERRIDE) API_URL = process.env.API_URL_OVERRIDE;

app.use("/", express.static(publicFolder));
app.use(API_URL, require("./Routes/index"));

app.use(
  "/",
  expressStaticGzip(publicFolder, {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
  })
);

app.get("/check-logs*", (req, res, next) => {
  const { event } = req.params;
  try {
    const { addLogs, read_logs } = require("./Handlers/Logger");
    let data;
    if (event) {
      const { read_log } = addLogs(event);
      data = read_log();
    } else {
      data = read_logs();
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
});

app.use(function (e, req, res, next) {
  let error;
  if (e.type) {
    error = e;
  } else {
    error = ServerError(e.status, e.message, e.stack, true);
  }
  if (process.env.MODE != "dev") {
    let message = "Internal Server Error " + error.message;
    error = { message };
  }
  return res.status(e.status || 500).json(error);
});

app.use("/*", (req, res) => {
  res.sendFile(join(publicFolder, "index.html"));
});

module.exports = app;
