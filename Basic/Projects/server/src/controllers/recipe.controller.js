const Recipe = require('../models/recipe.model')
const catchAsync = require('../utils/catchAsync')

const getAllRecipes = catchAsync(async (req, res) => {
    const allRecipes = await Recipe.find({})
    res.render('recipe/index', {allRecipes})
})

const renderCreateRecipeForm = (req, res) => {
    res.render('recipe/new')
}

const createOneRecipe = catchAsync(async (req, res) => {
    const newRecipe = new Recipe(req.body.recipe)
    await newRecipe.save()
    res.redirect(`/recipes/${newRecipe._id}`)
})

const getOneRecipe = catchAsync(async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findById(id)
    res.render('recipe/show', {recipe})
})

const deleteOneRecipe = catchAsync(async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findByIdAndDelete(id)
    res.redirect('/recipes')
})

const renderUpdateRecipeForm = catchAsync(async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findById(id)
    res.render('recipe/edit', {recipe})
})

const updateOneRecipe = catchAsync(async (req, res) => {
    const {id} = req.params
    const newRecipe = await Recipe.findByIdAndUpdate(id, req.body.recipe)
    res.redirect(`/recipes/${newRecipe._id}`)
})

module.exports = {getAllRecipes, renderCreateRecipeForm, createOneRecipe, getOneRecipe, deleteOneRecipe, updateOneRecipe, renderUpdateRecipeForm}