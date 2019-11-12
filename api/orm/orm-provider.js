const { Sequelize } = require('sequelize');

module.exports = () => {
    return _sequelize = new Sequelize('blogdbtest', 'guest', 'guest', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
