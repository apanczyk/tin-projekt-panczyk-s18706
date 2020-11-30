const Sequelize = require('sequelize');

const Review = require('../../model/sequelize/Review');
const Visitor = require('../../model/sequelize/Visitor');
const Meal = require('../../model/sequelize/Meal');

exports.getReviews = () => {
    return Review.findAll({
        include: [
            {
                model: Visitor,
                as: 'visitor'
            },
            {
                model: Meal,
                as: 'meal'
            }]
    });
};


exports.getReviewById = (reviewId) => {
    return Review.findByPk(reviewId, {
        include: [{
            model: Visitor,
            as: 'visitor'
        },
        {
            model: Meal,
            as: 'meal'
        }]
    });
};

exports.createReview = (data) => {
    console.log(JSON.stringify(data));

    return Review.create({
        visitor_id: data.visitor_id,
        meal_id: data.meal_id,
        rate: data.rate,
        date: data.date,
        message: data.message
    });
};

exports.updateReview = (reviewId, data) => {
    return Review.update(data, { where: { _id: reviewId } });
}

exports.deleteReview = (reviewId) => {
    return Review.destroy({
        where: { _id: reviewId }
    });
}

exports.deleteManyReviews = (reviewIds) => {
    return Review.destroy({
        where: { _id: reviewIds }
    });
}