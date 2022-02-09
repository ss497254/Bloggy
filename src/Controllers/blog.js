const BlogDao = require("../Dao/blog");
const getDeviceInfo = require("../Handlers/getDeviceInfo");

const getBlogs = async (req, res, next) => {
  getDeviceInfo(req);
  try {
    const blogs = await BlogDao.getBlogs();
    return res.json(blogs);
  } catch (e) {
    return next(e);
  }
};

const getBlog = async (req, res, next) => {
  const { id } = req.params;
  if (id.length != 12 && id.length != 24) {
    return res.status(404).json({ error: "Invalid id" });
  }
  try {
    const blog = await BlogDao.getBlog(id);
    return res.status(200).send(blog);
  } catch (e) {
    return next(e);
  }
};

const addBlog = async (req, res, next) => {
  const {
    Heading,
    SubHeading,
    BannerURL,
    Tags,
    Description,
    Content,
    Author,
    AuthorId,
    CreatedAt,
  } = req.body;
  if (
    Heading &&
    SubHeading &&
    BannerURL &&
    Description &&
    Content &&
    Author &&
    AuthorId
  ) {
    try {
      const { ops } = await BlogDao.addBlog({
        Heading,
        SubHeading,
        BannerURL,
        Tags,
        Description,
        Content,
        Author,
        AuthorId,
        CreatedAt,
      });
      const { _id } = ops[0];
      return res.json({ blog: { id: _id } });
    } catch (e) {
      return next(e);
    }
  } else {
    return res.status(400).json({ error: "Form Data Incorrect" });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await BlogDao.updateBlog(req.body.id, req.body.blog);
    return res.status(201).send(blog);
  } catch (e) {
    return next(e);
  }
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.body;
  if (id.length != 12 && id.length != 24) {
    return res.status(404).json({ error: "Invalid id" });
  }
  try {
    await BlogDao.deleteBlog(req.body.id);
    return res.status(201);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getBlog,
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
