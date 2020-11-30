const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Meal = sequelize.define('Meal', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Meal;