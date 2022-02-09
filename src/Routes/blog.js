const express = require("express");
const blogController = require("../Controllers/blog");
const auth = require("../Middleware/auth");

const router = express.Router();

router.get("/blogs/:id", blogController.getBlog);
router.get("/blogs", blogController.getBlogs);
router.post("/blogs", auth, blogController.addBlog);
router.patch("/blogs/update-blog", auth, blogController.updateBlog);
router.delete("/blogs/delete", auth, blogController.deleteBlog);

module.exports = router;
