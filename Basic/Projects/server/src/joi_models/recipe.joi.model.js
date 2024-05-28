const Joi = require('joi')

const recipeJoiSchema = Joi.object({
    title: Joi.string().max(50).required(),
    ingredients: Joi.string().required(),
    cookingInstruction: Joi.string().required(),
    difficultyLevel: Joi.string().valid('easy', 'medium', 'hard', 'advanced').required(),
    category: Joi.string().valid('breakfast', 'lunch', 'dinner', 'dessert').required(),
    price: Joi.number().min(0).required()
}).required()

module.exports = recipeJoiSchema