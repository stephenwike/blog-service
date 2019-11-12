const { Sequelize, Model } = require('sequelize');

class PostTopic extends Model { }  

module.exports = (sequelize) => {
    return PostTopic.init({
    }, {
        sequelize,
        modelName: 'posttopic',
        timestamps: false,
        freezeTableName: true
    })
}
