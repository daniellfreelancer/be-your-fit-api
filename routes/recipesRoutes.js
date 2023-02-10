var express = require('express');
var router = express.Router();

const {createRecipe, readRecipes} = require('../controllers/recipesController')

router.post('/create', createRecipe);
router.get('/all', readRecipes);

module.exports = router