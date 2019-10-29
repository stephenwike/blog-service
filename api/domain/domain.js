const { Sequelize, Model } = require('sequelize');

class Post extends Model { }
class Author extends Model { }
class Comment extends Model { }
class Topic extends Model { }
class PostTopic extends Model { }

function Initialize(sequelize) {
    Post.init({
        author: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'post',
        timestamps: false,
        freezeTableName: true
    });

    Author.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'author',
        timestamps: false,
        freezeTableName: true
    });

    Comment.init({
        author: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        post: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        level: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        content: {
            type: Sequelize.STRING(400),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'comment',
        timestamps: false,
        freezeTableName: true
    })

    Topic.init({
        label: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'topic',
        timestamps: false,
        freezeTableName: true
    })

    PostTopic.init({
        postid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        topic: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'posttopic',
        timestamps: false,
        freezeTableName: true
    })
}

module.exports = {
    Init: (sequelize) => {
        Initialize(sequelize);
        return {
            Post: Post,
            Author: Author,
            Comment: Comment,
            Topic: Topic,
            PostTopic: PostTopic,
        }
    }
}