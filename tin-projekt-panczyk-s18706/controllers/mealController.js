exports.showMealList = (req, res, next) => {
    res.render('pages/meal/list', { navLocation: 'meal' });
}

exports.showMealAdd = (req, res, next) => {
    res.render('pages/meal/form', { navLocation: 'meal' });
}

exports.showMealDetails = (req, res, next) => {
    res.render('pages/meal/details', { navLocation: 'meal' });
}

exports.showMealEdit = (req, res, next) => {
    res.render('pages/meal/edit', { navLocation: 'meal' });
}

