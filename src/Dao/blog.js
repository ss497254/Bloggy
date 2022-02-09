const { ObjectID } = require("mongodb");
const { BloggyError } = new (require("../Handlers/ServerError"))("Database");
const { mongoDB } = require("../DB/mongoDB");

const BlogsTable = mongoDB().collection("blogs");

async function getBlog(id) {
  const blog = await BlogsTable.findOne({ _id: ObjectID(id) });
  if (!blog) {
    throw BloggyError(404, "No Blog Found", "getBlogs");
  }
  return blog;
}

async function getBlogs() {
  const blogs = await BlogsTable.find().toArray();
  if (!blogs) {
    throw BloggyError(404, "No Blogs Found", "getBlogs");
  }
  return blogs;
}

async function addBlog(data) {
  return await BlogsTable.insertOne({ ...data });
}

async function updateBlog(id, data) {
  const blog = await BlogsTable.findOne({ _id: ObjectID(id) });
  if (!blog) throw BloggyError(404, "Blog not found", "update blog");
  await BlogsTable.findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: { ...data } }
  );
  return true;
}

async function deleteBlog(id) {
  return await BlogsTable.deleteOne({ _id: ObjectID(id) });
}

module.exports = {
  getBlog,
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
