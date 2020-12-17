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
                navLocation: 'review',
                validationErrors: null
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
                        visitor_id: review.visitor_id,
                        meal_id: review.meal_id,
                        formMode: 'edit',
                        allVisitors: allVisitors,
                        allMeals: allMeals,
                        pageTitle: 'Edycja recenzji',
                        btnLabel: 'Edytuj recenzje',
                        formAction: '/reviews/edit',
                        navLocation: 'review',
                        validationErrors: null
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
                        visitor_id: review.visitor_id,
                        meal_id: review.meal_id,
                        formMode: 'showDetails',
                        allVisitors: allVisitors,
                        allMeals: allMeals,
                        pageTitle: 'Szczegóły recenzji',
                        formAction: '',
                        navLocation: 'review',
                        validationErrors: null
                    });
                });
        });
}

exports.addReview = (req, res, next) => {
    const reviewData = { ...req.body };
    ReviewRepository.createReview(reviewData)
        .then(result => {
            res.redirect('/reviews');
        }).catch(err => {

            let allVisitors, allMeals;
            VisitorRepository.getVisitors()
                .then(visitors => {
                    allVisitors = visitors;
                    return MealRepository.getMeals();
                })
                .then(meals => {
                    allMeals = meals;
                    reviewData._id = -1;
                    res.render('pages/review/form', {
                        review: reviewData,
                        visitor_id: reviewData.visitor_id,
                        meal_id: reviewData.meal_id,
                        formMode: 'createNew',
                        allVisitors: allVisitors,
                        allMeals: allMeals,
                        pageTitle: 'Nowa recenzja',
                        btnLabel: 'Dodaj recenzje',
                        formAction: '/reviews/add',
                        navLocation: 'review',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.updateReview = (req, res, next) => {
    const reviewId = req.body._id;
    const reviewData = { ...req.body };
    ReviewRepository.updateReview(reviewId, reviewData)
        .then(result => {
            res.redirect('/reviews');
        }).catch(err => {

            ReviewRepository.getReviewById(reviewId)
                .then(review => {

                    console.log(review);
                    console.log('=================='); console.log('==================');
                    console.log(reviewData);
                    let allVisitors, allMeals;
                    VisitorRepository.getVisitors()
                        .then(visitors => {
                            allVisitors = visitors;
                            return MealRepository.getMeals();
                        })
                        .then(meals => {
                            allMeals = meals;
                            // reviewData.visitor.visitor._id = reviewData.visitor_id;
                            // reviewData.meal.meal._id = reviewData.meal_id;

                            console.log(reviewData.visitor_id + ' ' + reviewData.meal_id)

                            res.render('pages/review/form', {
                                review: reviewData,
                                visitor_id: reviewData.visitor_id,
                                meal_id: reviewData.meal_id,
                                formMode: 'edit',
                                allVisitors: allVisitors,
                                allMeals: allMeals,
                                pageTitle: 'Edycja recenzji',
                                btnLabel: 'Edytuj recenzje',
                                formAction: '/reviews/edit',
                                navLocation: 'review',
                                validationErrors: err.errors
                            });
                        });
                });
        });
};

exports.deleteReview = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.deleteReview(reviewId)
        .then(() => {
            res.redirect('/reviews');
        });
};


