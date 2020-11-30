const Visitor = require("../../model/sequelize/Visitor");
const Meal = require("../../model/sequelize/Meal");
const Review = require("../../model/sequelize/Review");

exports.getMeals = () => {
    return Meal.findAll();
};

exports.getMealById = (mealId) => {
    return Meal.findByPk(mealId,
        {
            include: [{
                model: Review,
                as: 'reviews',
                include: [{
                    model: Visitor,
                    as: 'visitor'
                }]
            }]
        });
};

exports.createMeal = (newMealData) => {
    return Meal.create({
        name: newMealData.name,
        description: newMealData.description
    });
};

exports.updateMeal = (mealId, mealData) => {
    const name = mealData.name;
    const description = mealData.description;
    return Meal.update(mealData, { where: { _id: mealId } });
};

exports.deleteMeal = (mealId) => {
    return Meal.destroy({
        where: { _id: mealId }
    });
};