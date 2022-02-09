(async function () {
  const { connectDB } = require("./src/DB/mongoDB");
  await connectDB();

  const app = require("./src/app");
  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    const { addLogs, setup } = require("./src/Handlers/Logger");
    setup();
    const { adlog } = addLogs("server");
    adlog(`Server started on http://localhost:${port}`);
  });
})();
