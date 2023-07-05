const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

// beforeEach(async () => {
//   await Blog.deleteMany({});

//   const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

//   const promiseArray = blogObjects.map((blog) => blog.save());
//   await Promise.all(promiseArray);
// });

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("Initially stored blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blogs contain an `id` field", async () => {
    const blogs = await helper.blogsInDb();
    const firstBlog = blogs[0];

    expect(firstBlog.id).toBeDefined();
  });
});

describe("Addition of new blogs", () => {
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

  test("adding a blog with no title or url return status 400 bad request", async () => {
    const noTitle = {
      author: "Test",
      url: "testing.com",
    };

    await api.post("/api/blogs").send(noTitle).expect(400);

    const noUrl = {
      title: "Test",
      author: "Test",
    };

    await api.post("/api/blogs").send(noUrl).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.content);

    expect(blogsAtEnd).not.toContainEqual(
      expect.objectContaining(blogToDelete)
    );
  });

  // test for errors
});

describe("Update blog", () => {
  test("changing likes succeeds with valid parameters", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 1109 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    expect(updatedBlog.likes).toEqual(1109);
  });

  // test("changing entire blog succeeds", async () => {

  // })
});

afterAll(async () => {
  await mongoose.connection.close();
});
