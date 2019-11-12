const { Sequelize, Model } = require('sequelize');

class Topic extends Model { }

module.exports = (sequelize) => 
{
    return Topic.init({
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
}
