var _ = require("lodash");

const totalLikes = (posts) => {
  return posts.length === 0
    ? 0
    : posts.reduce((total, currentPost) => total + currentPost.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return "No blogs found";
  }

  const favorite = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  // const favorite = _.maxBy(blogs, 'likes');

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  // Get the counts of blogs by author and convert to an array
  const result = _.toPairs(_.countBy(blogs, "author"));

  // Sort the results by the counts, then reverse to have most popular first
  // const topResult = _.reverse(_.sortBy(result, (item) => item[1]))[0];
  const topResult = _.orderBy(result, (item) => item[1], "desc")[0];

  return {
    author: topResult[0],
    blogs: topResult[1],
  };
};

const mostLikes = (blogs) => {
  // console.log(_.keyBy(blogs, "author"));
  // console.log(_.groupBy(blogs, "author"));
  const authors = _.groupBy(blogs, "author");

  let likesList = [];

  const result = _.forEach(authors, (value, key) => {
    // reduce the value into total number of likes
    const likes = _.reduce(value, (total, blog) => total + blog.likes, 0);

    likesList.push({
      author: key,
      likes: likes,
    });
  });

  return _.maxBy(likesList, "likes");
};

module.exports = {
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
};
