const dummy = (blogs) => {
  //
};

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

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
