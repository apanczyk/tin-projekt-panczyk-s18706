const ReviewRepository = require('../repository/sequelize/ReviewRepository');
const MealRepository = require('../repository/sequelize/MealRepository');
const VisitorRepository = require('../repository/sequelize/VisitorRepository');

exports.showReviewList = (req, res, next) => {
    ReviewRepository.getReviews()
        .then(reviews => {
            res.render('pages/review/list', {
                reviews: reviews,
                navLocation: 'review'
            });
        });
}

// exports.showReviewAdd = (req, res, next) => {
//     res.render('pages/review/form', { navLocation: 'review' });
// }

// exports.showReviewDetails = (req, res, next) => {
//     res.render('pages/review/details', { navLocation: 'review' });
// }

// exports.showReviewEdit = (req, res, next) => {
//     res.render('pages/review/edit', { navLocation: 'review' });
// }

exports.showAddReviewForm = (req, res, next) => {
    let allVisitors, allMeals;
    VisitorRepository.getVisitors()
        .then(visitors => {
            allVisitors = visitors;
            return MealRepository.getMeals();
        })
        .then(meals => {
            allMeals = meals;
            res.render('pages/review/form', {
                review: {},
                formMode: 'createNew',
                allVisitors: allVisitors,
                allMeals: allMeals,
                pageTitle: 'Nowa recenzja',
                btnLabel: 'Dodaj recenzje',
                formAction: '/reviews/add',
                navLocation: 'review'
            });
        });
}

exports.showEditReviewForm = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.getReviewById(reviewId)
        .then(review => {

            let allVisitors, allMeals;
            VisitorRepository.getVisitors()
                .then(visitors => {
                    allVisitors = visitors;
                    return MealRepository.getMeals();
                })
                .then(meals => {
                    allMeals = meals;
                    res.render('pages/review/form', {
                        review: review,
                        formMode: 'edit',
                        allVisitors: allVisitors,
                        allMeals: allMeals,
                        pageTitle: 'Edycja recenzji',
                        btnLabel: 'Edytuj recenzje',
                        formAction: '/reviews/edit',
                        navLocation: 'review'
                    });
                });
        });
}

exports.showReviewDetails = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.getReviewById(reviewId)
        .then(review => {
            let allVisitors, allMeals;
            VisitorRepository.getVisitors()
                .then(visitors => {
                    allVisitors = visitors;
                    return MealRepository.getMeals();
                })
                .then(meals => {
                    allMeals = meals;
                    res.render('pages/review/form', {
                        review: review,
                        formMode: 'showDetails',
                        allVisitors: allVisitors,
                        allMeals: allMeals,
                        pageTitle: 'Szczegóły recenzji',
                        formAction: '',
                        navLocation: 'review'
                    });
                });
        });
}

exports.addReview = (req, res, next) => {
    const reviewData = { ...req.body };
    ReviewRepository.createReview(reviewData)
        .then(result => {
            res.redirect('/reviews');
        });
};

exports.updateReview = (req, res, next) => {
    const reviewId = req.body._id;
    const reviewData = { ...req.body };
    ReviewRepository.updateReview(reviewId, reviewData)
        .then(result => {
            res.redirect('/reviews');
        });
};

exports.deleteReview = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.deleteReview(reviewId)
        .then(() => {
            res.redirect('/reviews');
        });
};


