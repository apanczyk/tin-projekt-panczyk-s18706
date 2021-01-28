const MealRepository = require('../repository/sequelize/MealRepository');

exports.showMealList = (req, res, next) => {
    MealRepository.getMeals()
        .then(meals => {
            res.render('pages/meal/list', {
                meals: meals,
                navLocation: 'meal',
                pageTitle: req.__('meal.list.pageTitle')
            });
        });
}

exports.showAddMealForm = (req, res, next) => {
    res.render('pages/meal/form', {
        meal: {},
        pageTitle: req.__('meal.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('meal.form.add.btnLabel'),
        formAction: '/meals/add',
        navLocation: 'meal',
        validationErrors: null
    });
}

exports.showEditMealForm = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.getMealById(mealId)
        .then(meal => {
            res.render('pages/meal/form', {
                meal: meal,
                formMode: 'edit',
                pageTitle: req.__('meal.form.edit.pageTitle'),
                btnLabel: req.__('meal.form.edit.btnLabel'),
                formAction: '/meals/edit',
                navLocation: 'meal',
                validationErrors: null
            });
        });
};

exports.showMealDetails = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.getMealById(mealId)
        .then(meal => {
            res.render('pages/meal/form', {
                meal: meal,
                formMode: 'showDetails',
                pageTitle: req.__('meal.form.details'),
                formAction: '',
                navLocation: 'meal',
                validationErrors: null
            });
        });
}

exports.addMeal = (req, res, next) => {
    const mealData = { ...req.body };
    MealRepository.createMeal(mealData)
        .then(result => {
            res.redirect('/meals');
        })
        .catch(err => {
            res.render('pages/meal/form', {
                meal: mealData,
                pageTitle: req.__('meal.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('meal.form.add.btnLabel'),
                formAction: '/meals/add',
                navLocation: 'meal',
                validationErrors: err.errors
            });
        });
};

exports.updateMeal = (req, res, next) => {
    const mealId = req.body._id;
    const mealData = { ...req.body };
    MealRepository.updateMeal(mealId, mealData)
        .then(result => {
            res.redirect('/meals');
        })
        .catch(err => {
            res.render('pages/meal/form', {
                meal: mealData,
                formMode: 'edit',
                pageTitle: req.__('meal.form.edit.pageTitle'),
                btnLabel: req.__('meal.form.edit.btnLabel'),
                formAction: '/meals/edit',
                navLocation: 'meal',
                validationErrors: err.errors
            });
        });
};

exports.deleteMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.deleteMeal(mealId)
        .then(() => {
            res.redirect('/meals');
        });
};
