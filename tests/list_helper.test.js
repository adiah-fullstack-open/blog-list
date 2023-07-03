const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const listWithOneBlog = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 5,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogPosts = [];

    expect(listHelper.totalLikes(blogPosts)).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("favorite blog", () => {
  test("returns a message if there is an empty list", () => {
    expect(listHelper.favoriteBlog([])).toBe("No blogs found");
  });

  test("returns the blog in a list of one", () => {
    const expectedResult = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 5,
    };
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(expectedResult);
  });

  test("returns the favorite blog in a longer list", () => {
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    expect(listHelper.favoriteBlog(blogs)).toEqual(expectedResult);
  });
});

describe("most blogs", () => {
  test("one blog returns the author of that blog", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 1,
    };
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expectedResult);
  });
  test("returns the correct author from multiple blogs", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    expect(listHelper.mostBlogs(blogs)).toEqual(expectedResult);
  });
});

describe("most likes", () => {
  test("returns the number of likes when one blog is submitted", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      likes: 5,
    };

    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expectedResult);
  });

  test("returns the correct likes and author for multiple blogs", () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    expect(listHelper.mostLikes(blogs)).toEqual(expectedResult);
  });
});
