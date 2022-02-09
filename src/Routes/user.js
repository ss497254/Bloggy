const { Router } = require("express");
const UserController = require("../Controllers/user");
const auth = require("../Middleware/auth");

const router = Router();

router.post("/sign-up", UserController.addUser);
router.post("/sign-in", UserController.getUser);
router.post("/fetch-user", auth, UserController.fetchUser);
router.patch("/update-usercred", auth, UserController.updateCred);
router.patch("/update-userinfo", auth, UserController.updateData);
router.delete("/delete", auth, UserController.deleteUser);

module.exports = router;
