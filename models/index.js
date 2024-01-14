// import models
const User = require("./User");
const Post = require("./post");
const Comment = require("./comments");

// User has many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comment belongs to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Comment belongs to post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Post has many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Export
module.exports = { User, Post, Comment };