// const VisitorRepository = require('../repository/mysql2/VisitorRepository');
const VisitorRepository = require('../repository/sequelize/VisitorRepository');

exports.getVisitors = (req, res, next) => {
    VisitorRepository.getVisitors()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getVisitorById = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.getVisitorById(visitorId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Visitor with id: ' + visitorId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createVisitor = (req, res, next) => {
    VisitorRepository.createVisitor(req.body)
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

exports.updateVisitor = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.updateVisitor(visitorId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Visitor updated!', visitor: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteVisitor = (req, res, next) => {
    const visitorId = req.params.visitorId;
    VisitorRepository.deleteVisitor(visitorId)
        .then(result => {
            res.status(200).json({ message: 'Removed Visitor', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};