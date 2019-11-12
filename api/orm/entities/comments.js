const { Sequelize, Model } = require('sequelize');

class Comment extends Model { }

module.exports = (sequelize) => {
    return Comment.init({
        level: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(400),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'comment',
        freezeTableName: true
    })
}
