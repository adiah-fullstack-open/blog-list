const Blog = require("../models/blog");

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
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
