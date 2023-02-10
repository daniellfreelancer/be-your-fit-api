const mongoose = require('mongoose')



const RecipesSchema = new mongoose.Schema({
    name:{type: String, required: true},
    preparation:{type: Array, required: true},
    ingredients:{type: Array, required: true},
    totalCalories:{type: Number, required: true},
    totalGrams:{type: Number, required: true},
    diet:{type: String, required: true},
    img:{type: String, required: true},
    tacc:{type: Boolean, required: true},
    vitamyn:{type: Array, required: true},
    protein:{type: String, required: true},
    mealTime:{type: String, required: true}
})



const RECIPES = mongoose.model(
    'recipes',
    RecipesSchema

)
module.exports = RECIPES