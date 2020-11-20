const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');


router.get('/', mealController.showMealList);
router.get('/add', mealController.showMealAdd);
router.get('/details/:mealId', mealController.showMealDetails);
router.get('/edit/:mealId', mealController.showMealEdit);

module.exports = router;