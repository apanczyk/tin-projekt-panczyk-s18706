const ReviewRepository = require('../repository/mysql2/ReviewRepository');

exports.getReviews = (req, res, next) => {
    ReviewRepository.getReviews()
        .then(reviews => {
            res.status(200).json(reviews);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getReviewById = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.getReviewById(reviewId)
        .then(review => {
            if (!review) {
                res.status(404).json({
                    message: 'Review with id: ' + reviewId + ' not found'
                })
            } else {
                res.status(200).json(review);
            }
        });
};

exports.createReview = (req, res, next) => {
    ReviewRepository.createReview(req.body)
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

exports.updateReview = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.updateReview(reviewId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Review updated!', review: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteReview = (req, res, next) => {
    const reviewId = req.params.reviewId;
    ReviewRepository.deleteReview(reviewId)
        .then(result => {
            res.status(200).json({ message: 'Removed Review', review: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManyReviews = (req, res, next) => {
    const reviewIds = req.body.toDelete;
    ReviewRepository.deleteManyReviews(reviewIds)
        .then(result => {
            res.status(200).json({ message: 'Reviews deleted!', review: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};