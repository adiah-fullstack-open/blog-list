const config = require("./utils/config");
const logger = require("./utils/logger");

const app = require("./app");

const Blog = require("./models/blog");

require("dotenv").config();

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  // const body =
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
