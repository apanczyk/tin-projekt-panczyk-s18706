const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');


router.get('/', mealController.showMealList);
router.get('/add', mealController.showAddMealForm);
router.get('/edit/:mealId', mealController.showEditMealForm);
router.get('/details/:mealId', mealController.showMealDetails);
router.post('/add', mealController.addMeal);
router.post('/edit', mealController.updateMeal);
router.get('/delete/:mealId', mealController.deleteMeal);


module.exports = router;