const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
);

// updates the number of likes on the blog
blogsRouter.patch("/:id", async (request, response, next) => {
  const likes = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, likes, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.status(200).json(updatedBlog);
});

// update the entire blog
blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  );

  response.status(200).json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if (blog.user.toString() !== user.id) {
      return response.status(401).json({
        error: "User not authorized. Only the creator of a post may delete it.",
      });
    }

    // await blog.delete();

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

module.exports = blogsRouter;
