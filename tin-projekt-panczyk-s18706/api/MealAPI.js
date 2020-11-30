const MealRepository = require('../repository/mysql2/MealRepository');

exports.getMeals = (req, res, next) => {
    MealRepository.getMeals()
        .then(meals => {
            res.status(200).json(meals);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMealById = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.getMealById(mealId)
        .then(meal => {
            if (!meal) {
                res.status(404).json({
                    message: 'Meal with id: ' + mealId + ' not found'
                })
            } else {
                res.status(200).json(meal);
            }
        });
};

exports.createMeal = (req, res, next) => {
    MealRepository.createMeal(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.updateMeal(mealId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Meal updated!', meal: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.deleteMeal(mealId)
        .then(result => {
            res.status(200).json({ message: 'Removed Meal', meal: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};