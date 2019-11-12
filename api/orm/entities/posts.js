const { Sequelize, Model } = require('sequelize');

class Post extends Model { }

module.exports = (sequelize) => {
    return Post.init({
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        modelName: 'post',
        freezeTableName: true
    });
}
