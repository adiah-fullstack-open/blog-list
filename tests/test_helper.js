const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "First Test Blog",
    author: "Nathaniel Adiah",
    url: "https://nathanieladiah.github.io",
    likes: 2,
  },
  {
    title: "Second Test Blog",
    author: "John Smith",
    url: "http://johnsmith.com",
    likes: 22,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
