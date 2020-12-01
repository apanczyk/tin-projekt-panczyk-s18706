const VisitorRepository = require('../repository/sequelize/VisitorRepository');

exports.showVisitorList = (req, res, next) => {
    VisitorRepository.getVisitors()
        .then(visitors => {
            res.render('pages/visitor/list', {
                visitors: visitors,
                navLocation: 'visitor'
            });
        });
}

// exports.showVisitorAdd = (req, res, next) => {
//     res.render('pages/visitor/form', { navLocation: 'visitor' });
// }

// exports.showVisitorDetails = (req, res, next) => {
//     res.render('pages/visitor/details', { navLocation: 'visitor' });
// }

// exports.showVisitorEdit = (req, res, next) => {
//     res.render('pages/visitor/edit', { navLocation: 'visitor' });
// }

exports.showAddVisitorForm = (req, res, next) => {
    res.render('pages/visitor/form', {
        visitor: {},
        pageTitle: 'Nowy gość',
        formMode: 'createNew',
        btnLabel: 'Dodaj gościa',
        formAction: '/visitors/add',
        navLocation: 'visitor'
    });
}

exports.showEditVisitorForm = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.getVisitorById(visitorId)
        .then(visitor => {
            res.render('pages/visitor/form', {
                visitor: visitor,
                formMode: 'edit',
                pageTitle: 'Edycja gościa',
                btnLabel: 'Edytuj gościa',
                formAction: '/visitors/edit',
                navLocation: 'visitor'
            });
        });
};

exports.showVisitorDetails = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.getVisitorById(visitorId)
        .then(visitor => {
            res.render('pages/visitor/form', {
                visitor: visitor,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły gościa',
                formAction: '',
                navLocation: 'visitor'
            });
        });
}

exports.addVisitor = (req, res, next) => {
    const visitorData = { ...req.body };
    VisitorRepository.createVisitor(visitorData)
        .then(result => {
            res.redirect('/visitors');
        });
};

exports.updateVisitor = (req, res, next) => {
    const visitorId = req.body._id;
    const visitorData = { ...req.body };
    VisitorRepository.updateVisitor(visitorId, visitorData)
        .then(result => {
            res.redirect('/visitors');
        });
};

exports.deleteVisitor = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.deleteVisitor(visitorId)
        .then(() => {
            res.redirect('/visitors');
        });
};
