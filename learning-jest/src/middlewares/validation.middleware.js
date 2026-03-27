const { body, validationResult } = require('express-validator')

async function validateResult(req, res, next) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    next()
}


const registerUserValidationRules = [
    body("username")
        .isString()
        .withMessage("username must be a string")//error message
        .isLength({ min: 3, max: 20 })
        .withMessage("username must be between 3 to 20 chars"),//error message

    body("email")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("password must be 6 chars long"),
    validateResult
]

module.exports = { registerUserValidationRules }


