const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response, next) => {
  // const body = request.body

  // const blog = new Blog({

  // })

  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });

  //   blog
  //     .save()
  //     .then((savedNote) => {
  //       response.json(savedNote);
  //     })
  //     .catch((error) => next(error));
});

module.exports = blogsRouter;
