const express = require('express')
const router = express.Router()
const {validateRecipe} = require('../middleware')
const {getAllRecipes, renderCreateRecipeForm, createOneRecipe, getOneRecipe, renderUpdateRecipeForm, updateOneRecipe, deleteOneRecipe} = require('../controllers/recipe.controller')

router.get('/', getAllRecipes)
router.get('/new', renderCreateRecipeForm)
router.post('/', validateRecipe, createOneRecipe)
router.get('/:id/edit', renderUpdateRecipeForm)
router.get('/:id', getOneRecipe)
router.put('/:id', validateRecipe, updateOneRecipe)
router.delete('/:id', deleteOneRecipe)

module.exports = router