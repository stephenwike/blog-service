const { Sequelize, Model } = require('sequelize');

class Author extends Model { }

module.exports = (sequelize) => {
    return Author.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'author',
        freezeTableName: true
    });
}
