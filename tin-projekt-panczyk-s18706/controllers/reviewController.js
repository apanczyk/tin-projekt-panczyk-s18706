const ReviewRepository = require('../repository/sequelize/ReviewRepository');

exports.showReviewList = (req, res, next) => {
    ReviewRepository.getReviews()
        .then(reviews => {
            res.render('pages/review/list', {
                reviews: reviews,
                navLocation: 'review'
            });
        });
}

exports.showReviewAdd = (req, res, next) => {
    res.render('pages/review/form', { navLocation: 'review' });
}

exports.showReviewDetails = (req, res, next) => {
    res.render('pages/review/details', { navLocation: 'review' });
}

exports.showReviewEdit = (req, res, next) => {
    res.render('pages/review/edit', { navLocation: 'review' });
}

