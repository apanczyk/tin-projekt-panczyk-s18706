const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-18706', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;