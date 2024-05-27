const express = require('express')
const router = express.Router()
const {getAllRecipes, renderCreateRecipeForm, createOneRecipe, getOneRecipe, renderUpdateRecipeForm, updateOneRecipe, deleteOneRecipe} = require('../controllers/recipe.controller')

router.get('/recipes', getAllRecipes)
router.get('/recipes/new', renderCreateRecipeForm)
router.post('/recipes', createOneRecipe)
router.get('/recipes/:id/edit', renderUpdateRecipeForm)
router.get('/recipes/:id', getOneRecipe)
router.put('/recipes/:id', updateOneRecipe)
router.delete('/recipes/:id', deleteOneRecipe)

module.exports = router