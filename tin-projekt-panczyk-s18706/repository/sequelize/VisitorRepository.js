const Visitor = require("../../model/sequelize/Visitor");
const Meal = require("../../model/sequelize/Meal");
const Review = require("../../model/sequelize/Review");

exports.getVisitors = () => {
    return Visitor.findAll();
};

exports.getVisitorById = (visitorId) => {
    return Visitor.findByPk(visitorId,
        {
            include: [{
                model: Review,
                as: 'reviews',
                include: [{
                    model: Meal,
                    as: 'meal'
                }]
            }]
        });
};

exports.createVisitor = (newVisitorData) => {
    return Visitor.create({
        firstName: newVisitorData.firstName,
        lastName: newVisitorData.lastName
    });
};

exports.updateVisitor = (visitorId, visitorData) => {
    const firstName = visitorData.firstName;
    const lastName = visitorData.lastName;
    return Visitor.update(visitorData, { where: { _id: visitorId } });
};

exports.deleteVisitor = (visitorId) => {
    return Visitor.destroy({
        where: { _id: visitorId }
    });
};