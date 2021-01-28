const Visitor = require("../../model/sequelize/Visitor");
const Meal = require("../../model/sequelize/Meal");
const Review = require("../../model/sequelize/Review");

const authUtil = require('../../util/authUtils');

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
        lastName: newVisitorData.lastName,
        email: newVisitorData.email,
        password: authUtil.hashPassword(newVisitorData.password)
    });
};

exports.updateVisitor = (visitorId, visitorData) => {
    visitorData.password = authUtil.hashPassword(visitorData.password);
    return Visitor.update(visitorData, { where: { _id: visitorId } });
};

exports.deleteVisitor = (visitorId) => {
    return Visitor.destroy({
        where: { _id: visitorId }
    });
};

exports.findByEmail = (email) => {
    return Visitor.findOne({
        where: { email: email }
    });
}