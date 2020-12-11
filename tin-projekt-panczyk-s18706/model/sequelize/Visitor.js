const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Visitor = sequelize.define('Visitor', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
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
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    }
});

module.exports = Visitor;