const { Sequelize } = require('sequelize');
var _sequelize;

module.exports = {
    Configure: () => {
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
    },
    PopulateModel: () => {
        return require('./domain/domain').Init(_sequelize);
    },
    Authenticate: () => {
        return _sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    },
    Sequelize: _sequelize
}