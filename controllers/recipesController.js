const Recipes = require('../models/recipesModel')


const RecipesController = {

    createRecipe : async (req, res)=>{
        try {
            let recipe = await new Recipes(req.body).save()
            res.status(201).json({
                message: 'Recibpe Has Been Created',
                success: true,
                response: recipe
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    readRecipes : async(req, res)=>{
        try {
            let allrecipes = await Recipes.find()
            if (allrecipes){
                res.status(200).json({
                    message: 'All recipes',
                    response: allrecipes,
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'Cannot read recipes',
                success: false
            })
        }
    }

}

module.exports = RecipesController