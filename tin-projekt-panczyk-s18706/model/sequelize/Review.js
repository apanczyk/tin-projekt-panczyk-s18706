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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isBetween(value) {
                if (value > 5 || value < 1) {
                    throw new Error('Ocena powinna być pomiędzy 1 a 5');
                }
            }
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
            isBeforeDate(value) {
                if (new Date(value) > new Date()) {
                    throw new Error('Data nie może być z przyszłości');
                }
            }
        }
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            checkTextLengthOptional(value) {
                min = 2;
                max = 100;

                value = value.toString().trim();
                const length = value.length;

                if (length != 0) {
                    if (length > max || length < min) {
                        throw new Error('Pole powinno zawierać od 2 do 100 znaków');
                    }
                }
            }
        }
    },
    visitor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
    meal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    }
});

module.exports = Review;