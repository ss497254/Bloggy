class ServerError {
  constructor(type) {
    this.type = type;
  }
  BloggyError = (status, message, stack = null, save_to_db) => {
    this.status = status ?? 500;
    this.stack = stack;
    this.message = String(message);

    const { adlog } = require("./Logger").addLogs(this.type);
    adlog(this, save_to_db);
    return this;
  };
}

module.exports = ServerError;
