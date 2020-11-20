exports.showVisitorList = (req, res, next) => {
    res.render('pages/visitor/list', { navLocation: 'visitor' });
}

exports.showVisitorAdd = (req, res, next) => {
    res.render('pages/visitor/form', { navLocation: 'visitor' });
}

exports.showVisitorDetails = (req, res, next) => {
    res.render('pages/visitor/details', { navLocation: 'visitor' });
}

exports.showVisitorEdit = (req, res, next) => {
    res.render('pages/visitor/edit', { navLocation: 'visitor' });
}

