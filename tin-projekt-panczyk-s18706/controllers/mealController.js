const MealRepository = require('../repository/sequelize/MealRepository');

exports.showMealList = (req, res, next) => {
    MealRepository.getMeals()
        .then(meals => {
            res.render('pages/meal/list', {
                meals: meals,
                navLocation: 'meal'
            });
        });
}

// exports.showMealAdd = (req, res, next) => {
//     res.render('pages/meal/form', { navLocation: 'meal' });
// }

// exports.showMealDetails = (req, res, next) => {
//     res.render('pages/meal/details', { navLocation: 'meal' });
// }

// exports.showMealEdit = (req, res, next) => {
//     res.render('pages/meal/edit', { navLocation: 'meal' });
// }

exports.showAddMealForm = (req, res, next) => {
    res.render('pages/meal/form', {
        meal: {},
        pageTitle: 'Dodaj nową potrawę',
        formMode: 'createNew',
        btnLabel: 'Dodaj potrawę',
        formAction: '/meals/add',
        navLocation: 'meal'
    });
}

exports.showEditMealForm = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.getMealById(mealId)
        .then(meal => {
            res.render('pages/meal/form', {
                meal: meal,
                formMode: 'edit',
                pageTitle: 'Edycja dania',
                btnLabel: 'Edytuj dania',
                formAction: '/meals/edit',
                navLocation: 'meal'
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
                pageTitle: 'Szczegóły dania',
                formAction: '',
                navLocation: 'meal'
            });
        });
}

exports.addMeal = (req, res, next) => {
    const mealData = { ...req.body };
    MealRepository.createMeal(mealData)
        .then(result => {
            res.redirect('/meals');
        });
};

exports.updateMeal = (req, res, next) => {
    const mealId = req.body._id;
    const mealData = { ...req.body };
    MealRepository.updateMeal(mealId, mealData)
        .then(result => {
            res.redirect('/meals');
        });
};

exports.deleteMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    MealRepository.deleteMeal(mealId)
        .then(() => {
            res.redirect('/meals');
        });
};
