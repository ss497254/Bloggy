const router = require("express").Router();

const userRouter = require("./user");
const blogRouter = require("./blog");

router.use(`/`, userRouter);
router.use(`/`, blogRouter);

module.exports = router;
