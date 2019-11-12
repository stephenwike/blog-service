const sequelize = require('./orm-provider')();
const Posts = require('./entities/posts')(sequelize);
const Authors = require('./entities/authors')(sequelize);
const Topics = require('./entities/topics')(sequelize);
const PostTopics = require('./entities/posttopics')(sequelize);
const Comments = require('./entities/comments')(sequelize);

Posts.hasMany(Comments);
Comments.hasMany(Comments);
Posts.hasMany(PostTopics);
Topics.hasMany(PostTopics);

Authors.hasMany(Posts);
Authors.hasMany(Comments);

// https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/ 
//  has been very helpful...

module.exports = {
    Post: Posts,
    Author: Authors,
    Topic: Topics,
    PostTopic: PostTopics,
    Comment: Comments
}