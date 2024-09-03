const createError = require('http-errors')
const { signAccessToken , signRefreshToken , verifyRefreshToken } = require('../Helpers/jwthelper');
const client = require('../Helpers/init_redis');
const { UserSchema } = require('../Models');
const { createUser } = require('../Helpers/validation');

module.exports = {
    register : async(req,res,next) => {
        try{
            const result = await createUser.validateAsync(req.body)
            const doesExist = await UserSchema.findOne({PhoneNumber: result.PhoneNumber})
            if (doesExist){
                res.send({
                    status: 1001,
                    message: "User Exists",
                })
            }
            const user = new UserSchema(result)
            const savedUser = await user.save().lean()
            const accessToken = await signAccessToken(savedUser.id)
            const refreshToken = await signRefreshToken(savedUser.id)
            res.send({accessToken , refreshToken})
        }
        catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    login : async(req,res,next) => {
        try{
            const result = await createUser.validateAsync(req.body)
            const user = await UserSchema.findOne({ email: result.email})
    
            if(!user) throw createError.NotFound('User Not Registered')
            const isMatch = await user.isValidPassword(result.password)
            if(!isMatch)
            throw createError.Unauthorized('Username/password not valid')
    
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
    
            res.send({accessToken , refreshToken})
        }
        catch(error){
            if (error.isJoi === true) 
            return next(createError.BadRequest("Invalid Username/Password"))
            next(error)
        }
    },
}