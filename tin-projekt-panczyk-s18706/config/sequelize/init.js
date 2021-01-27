const sequelize = require('./sequelize');

const Visitor = require('../../model/sequelize/Visitor');
const Meal = require('../../model/sequelize/Meal');
const Review = require('../../model/sequelize/Review');

module.exports = () => {
    Visitor.hasMany(Review, { as: 'reviews', foreignKey: { name: 'visitor_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Review.belongsTo(Visitor, { as: 'visitor', foreignKey: { name: 'visitor_id', allowNull: false } });
    Meal.hasMany(Review, { as: 'reviews', foreignKey: { name: 'meal_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Review.belongsTo(Meal, { as: 'meal', foreignKey: { name: 'meal_id', allowNull: false } });

    let allVisitors, allMeals;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Visitor.findAll();
        })
        .then(visitors => {
            if (!visitors || visitors.length == 0) {
                const authUtil = require('../../util/authUtils');
                const passHash = authUtil.hashPassword('12345');

                return Visitor.bulkCreate([
                    { firstName: 'Jan', lastName: 'Nowak', email: 'jan.nowak@email.com', password: passHash },
                    { firstName: 'Krzysztof', lastName: 'Kowalski', email: 'kkowalski@email.com', password: passHash },
                    { firstName: 'Anna', lastName: 'Kowalczyk', email: 'akowalczyk@email.com', password: passHash },
                ])
                    .then(() => {
                        return Visitor.findAll();
                    });
            } else {
                return visitors;
            }
        })
        .then(visitors => {
            allVisitors = visitors;
            return Meal.findAll();
        })
        .then(meals => {
            if (!meals || meals.length == 0) {
                return Meal.bulkCreate([
                    { name: 'Pizza pepperoni', description: 'Pizza z pepperoni' },
                    { name: 'Pizza napoletana', description: 'Pizza z szynka' }
                ])
                    .then(() => {
                        return Visitor.findAll();
                    });
            } else {
                return meals;
            }
        })
        .then(meals => {
            allMeals = meals;
            return Review.findAll();
        })
        .then(reviews => {
            if (!reviews || reviews.length == 0) {
                return Review.bulkCreate([
                    { visitor_id: allVisitors[0]._id, meal_id: allMeals[0]._id, rate: 5, date: '2020-10-03', message: 'Polecam' },
                    { visitor_id: allVisitors[1]._id, meal_id: allMeals[0]._id, rate: 4, date: '2020-10-05', message: 'Bardzo smaczna' },
                    { visitor_id: allVisitors[0]._id, meal_id: allMeals[1]._id, rate: 3, date: '2020-10-02', message: null }
                ]);
            } else {
                return reviews;
            }
        });
};