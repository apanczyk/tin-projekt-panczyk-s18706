const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Review = sequelize.define('Review', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
    visitor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    meal_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Review;