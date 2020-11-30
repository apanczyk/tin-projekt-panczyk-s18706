const express = require('express');
const router = express.Router();

const mealApiController = require('../../api/MealAPI');

router.get('/', mealApiController.getMeals);
router.get('/:mealId', mealApiController.getMealById);
router.post('/', mealApiController.createMeal);
router.put('/:mealId', mealApiController.updateMeal);
router.delete('/:mealId', mealApiController.deleteMeal);

module.exports = router;