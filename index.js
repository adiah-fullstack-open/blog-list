const config = require("./utils/config");
const logger = require("./utils/logger");

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const Blog = require("./models/blog");

require("dotenv").config();

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => {
    logger.error(error.message);
  });

app.use(cors());
app.use(express.json());

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

const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
