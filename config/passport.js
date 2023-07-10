const database = require('../database')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

module.exports = (passport)=>{
    passport.use(new JwtStrategy(
        options, async(jwt_payload, done)=>{
            // console.log(jwt_payload)
            const user = await database.getAdminById(jwt_payload.sub)
            if(user.length>0){
                return done(null, user)
            }
            else{
                return(null, false)
            }
        }
    ))
}