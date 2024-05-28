const recipeJoiSchema = require('./joi_models/recipe.joi.model')
const ExpressError = require('./utils/ExpressError')

module.exports.validateRecipe = (req, res, next) => {
    const {error} = recipeJoiSchema.validate(req.body)
    if(error) {
        const message = error.details.map(e => e.message).join(',')
        throw new ExpressError(message, 400)
    }
    else {
        next()
    }
}