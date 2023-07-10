const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const createSalt = async ()=>{
    const salt = await bcrypt.genSalt(10)
    return salt
}
const createPassword = async(password, salt)=>{
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}
const validPassword = async(password, toCheck)=>{
    const isValid = bcrypt.compare(toCheck, password)
    return isValid
}
const issueJWT= (user_id)=>{
    const id = user_id
    const payload = {
        sub: id,
        iat: Date.now()
    }
    const signedToken = jwt.sign(payload, process.env.SECRET_KEY)
    return {
        token:signedToken,
    }
}

module.exports.createPassword = createPassword
module.exports.createSalt = createSalt
module.exports.validPassword = validPassword
module.exports.issueJWT = issueJWT