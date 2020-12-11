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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane!"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane!"
            },
            len: {
                args: [2, 100],
                msg: "Pole powinno zawierać od 2 do 100 znaków"
            },
        }
    }
});

module.exports = Meal;