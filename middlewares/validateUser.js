//use @hapi/joi to validate the user information
const joi = require('@hapi/joi')

//validation for creating a user
const createUserValidation = userData =>{
    const schema = joi.object({
        name: joi.string().required().min(6),
        email: joi.string().min(6).email().required(),
        password: joi.string().min(6).required()
    })
     return schema.validate(userData);
}

//validation schema for login. Only email and password
const loginValidation = userData =>{
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    return schema.validate(userData)
}

module.exports = { createUserValidation, loginValidation }
