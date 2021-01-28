const VisitorRepository = require('../repository/sequelize/VisitorRepository');

exports.showVisitorList = (req, res, next) => {
    VisitorRepository.getVisitors()
        .then(visitors => {
            res.render('pages/visitor/list', {
                visitors: visitors,
                navLocation: 'visitor',
                pageTitle: req.__('visitor.list.pageTitle')
            });
        });
}

exports.showAddVisitorForm = (req, res, next) => {
    res.render('pages/visitor/form', {
        visitor: {},
        pageTitle: req.__('visitor.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('visitor.form.add.btnLabel'),
        formAction: '/visitors/add',
        navLocation: 'visitor',
        validationErrors: null
    });
}

exports.showEditVisitorForm = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.getVisitorById(visitorId)
        .then(visitor => {
            res.render('pages/visitor/form', {
                visitor: visitor,
                formMode: 'edit',
                pageTitle: req.__('visitor.form.edit.pageTitle'),
                btnLabel: req.__('visitor.form.edit.btnLabel'),
                formAction: '/visitors/edit',
                navLocation: 'visitor',
                validationErrors: null
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
                pageTitle: req.__('visitor.form.details'),
                formAction: '',
                navLocation: 'visitor',
                validationErrors: null
            });
        });
}

exports.addVisitor = (req, res, next) => {
    const visitorData = { ...req.body };
    VisitorRepository.createVisitor(visitorData)
        .then(result => {
            res.redirect('/visitors');
        })
        .catch(err => {
            res.render('pages/visitor/form', {
                visitor: visitorData,
                pageTitle: req.__('visitor.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('visitor.form.add.btnLabel'),
                formAction: '/visitors/add',
                navLocation: 'visitor',
                validationErrors: err.errors
            });
        });
};

exports.updateVisitor = (req, res, next) => {
    const visitorId = req.body._id;
    const visitorData = { ...req.body };
    VisitorRepository.updateVisitor(visitorId, visitorData)
        .then(result => {
            res.redirect('/visitors');
        })
        .catch(err => {
            const visitorId = req.body._id;
            VisitorRepository.getVisitorById(visitorId)
                .then(visitor => {
                    res.render('pages/visitor/form', {
                        visitor: visitorData,
                        formMode: 'edit',
                        pageTitle: req.__('visitor.form.edit.pageTitle'),
                        btnLabel: req.__('visitor.form.edit.btnLabel'),
                        formAction: '/visitors/edit',
                        navLocation: 'visitor',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteVisitor = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.deleteVisitor(visitorId)
        .then(() => {
            res.redirect('/visitors');
        });
};
