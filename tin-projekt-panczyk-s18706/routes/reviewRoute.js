const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.get('/', reviewController.showReviewList);
router.get('/add', reviewController.showAddReviewForm);
router.get('/edit/:reviewId', reviewController.showEditReviewForm);
router.get('/details/:reviewId', reviewController.showReviewDetails);
router.post('/add', reviewController.addReview);
router.post('/edit', reviewController.updateReview);
router.get('/delete/:reviewId', reviewController.deleteReview);


module.exports = router;