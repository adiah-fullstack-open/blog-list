const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs contain an `id` field", async () => {
  const blogs = await helper.blogsInDb();
  const firstBlog = blogs[0];

  expect(firstBlog.id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Testing Blog Title",
    author: "Testing Author",
    url: "testing.url.co",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  // expect(blogsAtEnd).toContainEqual(newBlog);
  expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlog));
});

test("adding a blog with no likes defaults to 0", async () => {
  const newBlog = {
    title: "Testing Blog Title",
    author: "Testing Author",
    url: "testing.url.co",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];

  expect(lastBlog.likes).toBeDefined();
  expect(lastBlog.likes).toEqual(0);
});

test.only("adding a blog with no title or url return status 400 bad request", async () => {
  const noTitle = {
    author: "Test",
    url: "testing.com",
  };

  await api.post("/api/blogs").send(noTitle).expect(400);

  const noUrl = {
    title: "Test",
    author: "Test",
  };

  await api.post("/api/blogs").send(noTitle).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
