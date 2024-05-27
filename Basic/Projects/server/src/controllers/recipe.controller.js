const Recipe = require('../models/recipe.model')

const getAllRecipes = async (req, res) => {
    const allRecipes = await Recipe.find({})
    res.render('recipe/index', {allRecipes})
}

const renderCreateRecipeForm = (req, res) => {
    res.render('recipe/new')
}

const createOneRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body.recipe)
    await newRecipe.save()
    res.redirect(`/recipes/${newRecipe._id}`)
}

const getOneRecipe = async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findById(id)
    res.render('recipe/show', {recipe})
}

const deleteOneRecipe = async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findByIdAndDelete(id)
    res.redirect('/recipes')
}

const renderUpdateRecipeForm = async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findById(id)
    res.render('recipe/edit', {recipe})
}

const updateOneRecipe = async (req, res) => {
    const {id} = req.params
    const newRecipe = await Recipe.findByIdAndUpdate(id, req.body.recipe)
    res.redirect(`/recipes/${newRecipe._id}`)
}

module.exports = {getAllRecipes, renderCreateRecipeForm, createOneRecipe, getOneRecipe, deleteOneRecipe, updateOneRecipe, renderUpdateRecipeForm}