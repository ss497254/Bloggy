const { MongoClient } = require("mongodb");
const debug = require("debug")("database");

let db_URI = "mongodb://127.0.01:27017/dev";
let mongoClient;

module.exports = {
  async connectDB() {
    debug("Connecting to mongodb... ");

    if (
      process.env.DB_HOST &&
      process.env.DB_USERNAME &&
      process.env.DB_PASSWORD
    ) {
      db_URI = `mongodb+srv://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD
      }@${process.env.DB_HOST}/${process.env.DB_NAME || "dev"}`;
    }
    return MongoClient.connect(db_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        mongoClient = client;
        debug(
          "Connected to mongodb %s",
          process.env.DB_HOST ? "atlas" : "local"
        );
      })
      .catch((e) => {
        debug(e);
      });
  },
  mongoDB() {
    if (!mongoClient) {
      debug("could not connect to database\nExiting...");
      process.exit(1);
    }
    return mongoClient.db(process.env.DB_NAME);
  },
};
