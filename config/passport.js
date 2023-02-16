const passport = require('passport')
const passportJWT = require('passport-jwt')

const {KEY_JWT} = process.env
const User = require('../models/usersAppModel')

passport.use(
    new passportJWT.Strategy(
        {                                 
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT
        }, //returns object jwt_payload (body with data)
        async (jwt_payload, done) =>{

            try {
                let userFit = await User.findOne({_id:jwt_payload.id})
                if(userFit){
                    userFit = {
                        id: userFit._id,
                        name: userFit.name,
                        email: userFit.email,
                        role: userFit.role,
                        imgUrl: userFit.imgUrl,
                        weight: userFit.weight,
                        size: userFit.size
                    }
                    return done(null, userFit)
                }else{
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error, false)
            }
        }
    )
)
module.exports = passport