const orm = require('./orm-provider');
const sequelize = orm.Configure();
const { Post, Author, Topic, PostTopic, Comment } = orm.PopulateModel();

module.exports = {
    Post: Post,
    Author: Author,
    Topic: Topic,
    PostTopic, PostTopic,
    Comment, Comment
}