const express = require('express');
const router = express.Router();

const reviewApiController = require('../../api/ReviewAPI');

router.get('/', reviewApiController.getReviews);
router.get('/:reviewId', reviewApiController.getReviewById);
router.post('/', reviewApiController.createReview);
router.put('/:reviewId', reviewApiController.updateReview);
router.delete('/:reviewId', reviewApiController.deleteReview);
router.delete('/', reviewApiController.deleteManyReviews);

module.exports = router;