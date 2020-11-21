const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.get('/', reviewController.showReviewList);
router.get('/add', reviewController.showReviewAdd);
router.get('/details/:reviewId', reviewController.showReviewDetails);
router.get('/edit/:reviewId', reviewController.showReviewEdit);

module.exports = router;